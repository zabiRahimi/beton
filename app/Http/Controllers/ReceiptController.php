<?php

namespace App\Http\Controllers;
use Illuminate\Support\Collection;


use App\Models\Receipt;
use App\Http\Requests\StoreReceiptRequest;
use App\Http\Requests\UpdateReceiptRequest;
use App\Models\Customer;
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceiptRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Receipt $receipt)
    {
        //
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

    public function fetchData() : JsonResponse {
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

    private function customers (): Collection {
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
}
