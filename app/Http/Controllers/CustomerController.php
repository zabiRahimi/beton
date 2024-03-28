<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\BankInfo;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    // StoreCustomerRequest $request
    public function store( StoreCustomerRequest $request)
    {
        DB::transaction(function () use ($request) {
            $customer = new Customer;
            $customer->fill($request->validated());
            $customer->save();
        
            $customer->customerTypes()->sync($request->validated()['types']);
        },3);

        return response()->json(['zabi' => 'ok'], 200);


try {
    DB::beginTransaction();

    $customer = new Customer;
    $customer->fill($request->validated());
    $customer->save();

    $customer->customerTypes()->sync($request->validated()['types']);


    try {
        
    if (isset($request->validated()['bank_details']) && count($request->validated()['bank_details']) > 0) {
        foreach ($request->validated()['bank_details'] as $bankDetailData) {
            // Validate the bank details
            $validator = Validator::make($bankDetailData, [
                'bank_name' => 'required',
                'account_number' => 'required_without_all:card_number,iban',
                'card_number' => 'required_without_all:account_number,iban',
                'iban' => 'required_without_all:account_number,card_number',
            ]);

            if ($validator->fails()) {
                // Validation failed, throw an exception
                throw new \Exception('Bank details validation failed');
            }

            // Create and insert the bank detail
            $bankDetail = new BankInfo;
            $bankDetail->fill($bankDetailData);
            $bankDetail->customer_id = $customer->id;
            $bankDetail->save();
        }
    }
    } catch (\Exception $e) {
        
        // \Log::error($e->getMessage());
    }

    // Commit the transaction
    DB::commit();
} catch (\Exception $e) {
    // An exception occurred, rollback the transaction
    DB::rollback();
    // Log the exception
    // \Log::error($e->getMessage());
    // Rethrow the exception
    throw $e;
}

    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
