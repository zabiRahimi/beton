<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetProformaInvoiceRequest;
use App\Models\ProformaInvoice;
use App\Http\Requests\StoreProformaInvoiceRequest;
use App\Http\Requests\UpdateProformaInvoiceRequest;
use App\Models\ProformaInvoiceProduct;
use Illuminate\Support\Facades\DB;


class ProformaInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetProformaInvoiceRequest $request)
    {
        $query = ProformaInvoice::query();
        if ($request->filled('id')) {
            $query->where('id', $request->id);
        } else {

            if ($request->filled('buyer')) {
                $query->where('buyer', 'LIKE', "%{$request->buyer}%");
            }

            if ($request->filled('tel')) {
                $query->where('tel', $request->tel);
            }

            if ($request->filled('nationalCode')) {
                $query->where('nationalCode', $request->nationalCode);
            }

            if ($request->filled('date')) {
                $query->where('date', $request->date);
            } elseif ($request->filled('startDate') || $request->filled('endDate')) {
                $query->when($request->filled('startDate') && $request->filled('endDate'), function ($q) use ($request) {
                    $q->whereBetween('created_at', [$request->startDate, $request->endDate]);
                })
                    ->when($request->filled('startDate') && !$request->filled('endDate'), function ($q) use ($request) {
                        $q->where('created_at', '>=', $request->startDate);
                    })
                    ->when(!$request->filled('startDate') && $request->filled('endDate'), function ($q) use ($request) {
                        $q->where('created_at', '<=', $request->endDate);
                    });
            }
        }

        $proformaInvoices = $query->orderByDesc('id')->paginate(50);

        return response()->json(['proformaInvoices' =>  $proformaInvoices], 200);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
   

    public function store(StoreProformaInvoiceRequest $request)
    {
        try {
            DB::beginTransaction();

            $proformaInvoice = new ProformaInvoice();
            $proformaInvoice->fill($request->validated());
            $proformaInvoice->save();

            $products = $request->validated()['products'];


            foreach ($products as $key) {
                $proformaInvoiceProduct = new ProformaInvoiceProduct();
                $proformaInvoiceProduct->proforma_invoice_id = $proformaInvoice->id;
                $proformaInvoiceProduct->fill($key);
                $proformaInvoiceProduct->save();
            }

            DB::commit();

            $proformaInvoice->load('proformaInvoiceProducts'); // بارگذاری ارتباطات برای بازگرداندن در پاسخ
            return response()->json(['proformaInvoice' => $proformaInvoice], 200);
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }
    }


    /**
     * Display the specified resource.
     */
   
    public function showInvoice(int $id)
    {
        $proformaInvoice = ProformaInvoice::with('proformaInvoiceProducts')->findOrFail($id);
        return response()->json(['proformaInvoice'=>$proformaInvoice],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProformaInvoice $proformaInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProformaInvoiceRequest $request, ProformaInvoice $proformaInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProformaInvoice $proformaInvoice)
    {
        //
    }
}
