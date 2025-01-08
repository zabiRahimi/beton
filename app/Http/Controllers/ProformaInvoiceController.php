<?php

namespace App\Http\Controllers;

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
    public function index()
    {
        //
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
    // public function store(StoreProformaInvoiceRequest $request)
    // {
    //     try {
    //         DB::beginTransaction();
            
    //         $proformaInvoice = new ProformaInvoice();
    //         $proformaInvoice->fill($request->validated());
    //         $proformaInvoice->save();

    //         $allResult = [];
    //         foreach ($request->validated()['products'] as $key) {
    //             $proformaInvoiceProduct = new ProformaInvoiceProduct();
    //             $proformaInvoiceProduct->proforma_invoice_id =  $proformaInvoiceId;
    //             $proformaInvoiceProduct->fill($key);
    //             $proformaInvoiceProduct->save();
    //         }
    //         DB::commit();
    //     } catch (\Throwable $th) {
    //         DB::rollback();

    //         throw $th;
    //     }

    //     return response()->json(['proformaInvoice' =>  $allResult], 200);
    // }

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
    public function show(ProformaInvoice $proformaInvoice)
    {
        //
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
