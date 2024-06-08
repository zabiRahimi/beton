<?php

namespace App\Http\Controllers;

use App\Models\ConcreteSalesInvoice;
use App\Http\Requests\StoreConcreteSalesInvoiceRequest;
use App\Http\Requests\UpdateConcreteSalesInvoiceRequest;
use App\Models\Customer;
use App\Models\Truck;

class ConcreteSalesInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $oncreteSalesInvoices = ConcreteSalesInvoice::orderBy('id')->get();

        return response()->json(['oncreteSalesInvoices' => $oncreteSalesInvoices], 200);
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
    public function store(StoreConcreteSalesInvoiceRequest $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(ConcreteSalesInvoice $concreteSalesInvoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ConcreteSalesInvoice $concreteSalesInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConcreteSalesInvoiceRequest $request, ConcreteSalesInvoice $concreteSalesInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ConcreteSalesInvoice $concreteSalesInvoice)
    {
        //
    }

    public function getCSIConcreteBuyers()
    {
        $concreteBuyers = Customer::concreteBuyers()->get();

        return response()->json(['concreteBuyers'=> $concreteBuyers]);

    }

    public function getCSIConcretes()
    {
    }

    public function getCSIMixers()
    {
        $mixers= Truck::getMixers();
        return response()->json(['mixers'=> $mixers]);

    }

    public function getCSIDrivers()
    {
    }
}
