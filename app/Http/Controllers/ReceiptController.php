<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;



use App\Models\Receipt;
use App\Http\Requests\StoreReceiptRequest;
use App\Http\Requests\UpdateReceiptRequest;
use App\Models\Customer;
use App\Models\Financial;
use App\Models\SandRemittance;
use Illuminate\Http\JsonResponse;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceiptRequest $request)
    {
        try {
            DB::beginTransaction();
            $customer_id = $request->validated()['customer_id'];
            $price = $request->validated()['price'];

            $receipt = new Receipt();
            $receipt->fill($request->validated());
            $receipt->save();

            $this->addTopayerAccount($customer_id, $price);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }

        return response()->json(['receipt' =>  $receipt], 200);
    }

    /**
     * Display the specified resource.
     */
    // public function showReceipt(int $id)
    // {
    //     $receipt = Receipt::with('customer')->findOrFail($id);
    //     return response()->json(['receipt'=>$receipt],200);
    // }

    public function showReceipt(int $id)
    {
        $receipt = Receipt::with('customer')->findOrFail($id);

        // بررسی ستون‌ها و اضافه کردن اطلاعات مربوطه
        if ($receipt->document_receivable_id) {
            $documentReceivable = $this->getDocumentReceivable($receipt->document_receivable_id);
            $receipt->document_receivable = $documentReceivable;
        } elseif ($receipt->sand_remittance_id) {
            $sandRemittance = $this->getSandRemittance($receipt->sand_remittance_id);
            $receipt->sand_remittance = $sandRemittance;
        } elseif ($receipt->cement_remittance_id) {
            $cementRemittance = $this->getCementRemittance($receipt->cement_remittance_id);
            $receipt->cement_remittance = $cementRemittance;
        }

        return response()->json(['receipt' => $receipt], 200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receipt $receipt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReceiptRequest $request, Receipt $receipt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receipt $receipt)
    {
        //
    }

    public function fetchData(): JsonResponse
    {
        $count = $this->count();
        $customers = $this->customers();
        $documentReceivables = $this->documentReceivables();
        $sandRemittances = $this->sandRemittances();
        $cementRemittances = $this->cementRemittances();
        return response()->json([
            'count' => $count,
            'customers' => $customers,
            'documentReceivables' => $documentReceivables,
            'sandRemittances' => $sandRemittances,
            'cementRemittances' => $cementRemittances,

        ]);
    }

    private function count(): int
    {
        return Receipt::count();
    }

    private function customers(): Collection
    {
        return Customer::get();
    }

    private function documentReceivables()
    {
        // return DocumentReceivable::get();
        return null;
    }

    private function sandRemittances()
    {
        return SandRemittance::get();
    }

    private function cementRemittances()
    {
        // return CementRemittance::get();
        return null;
    }

    /**
     * مبلغ  را به حساب پرداخت کننده اضافه می کند
     */
    private function addTopayerAccount(int $customer_id, int $price)
    {
        Financial::updateOrCreate(
            ['customer_id' => $customer_id],
            ['creditor' => DB::raw('creditor + ' . $price)]
        );
    }

    public function getDocumentReceivable($id)
    {
        // return DocumentReceivable::find($id);
    }

    public function getSandRemittance($id)
    {
        return SandRemittance::find($id);
    }

    public function getCementRemittance($id)
    {
        // return CementRemittance::find($id);
    }
}
