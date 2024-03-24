<?php

namespace App\Http\Controllers;

use App\Models\CustomerType;
use App\Http\Requests\StoreCustomerTypeRequest;
use App\Http\Requests\UpdateCustomerTypeRequest;

class CustomerTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $CustomerTypes = CustomerType::orderBy('id')->get();

        return response()->json(['CustomerTypes' => $CustomerTypes]);
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
    public function store(StoreCustomerTypeRequest $request)
    {
        $type = CustomerType::create([
            'type' => $request->type,
        ]);

        return response()->json(['CustomerTypes' => $type], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomerType $customerType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomerType $customerType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerTypeRequest $request, CustomerType $customerType)
    {
        $customerType->update(['type' => $request->type]);

        return response()->json(['customerType'=>$customerType] ,200);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerType $customerType)
    {
        //
    }
}

