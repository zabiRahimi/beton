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
        $Customers = Customer::orderBy('id')->with(['customerTypes','bankInfo'])->get();

        return response()->json(['Customers' => $Customers]);
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
    public function store(StoreCustomerRequest $request)
    {

        try {
            DB::beginTransaction();

            $customer = new Customer;
            $customer->fill($request->validated());
            $customer->save();

            $customer->customerTypes()->sync($request->validated()['types']);
            

            try {

                if (isset($request->validated()['bankInfo']) && count($request->validated()['bankInfo']) > 0) {
                    foreach ($request->validated()['bankInfo'] as $bankDetailData) {

                        $bankDetail = new BankInfo;
                        $bankDetail->fill($bankDetailData);
                        $bankDetail->customer_id = $customer->id;
                        $bankDetail->save();
                    }
                }
            } catch (\Exception $e) {

                // \Log::error($e->getMessage());
            }
            // اضافه کردن رکوردهای ذخیره شده در دو جدول دیگر به متغییر زیر
            $customer->load('customerTypes', 'bankInfo');
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            // \Log::error($e->getMessage());
            throw $e;
        }

        return response()->json(['customer'=>  $customer],200);
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
        // $customer->update(['type' => $request->type]);

         
    $customer->update($request->all());
    $customer->customerTypes()->sync($request->validated()['types']);

    // if ($request->has('customer_types')) {
    //     $customer->customerTypes()->sync($request->get('customer_types'));
    // }

    //  if ($request->has('bank_info')) {
    //     $customer->bankInfo()->update($request->get('bank_info'));
    // }

        return response()->json(['customer'=>$customer] ,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
