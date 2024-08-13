<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\GetCustmoerRequest;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\BankInfo;
use App\Models\CustomerType;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetCustmoerRequest $request)
    {
        $query = Customer::query();

        // فیلتر کردن بر اساس تاریخ
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        } elseif ($request->filled('start_date')) {
            $query->where('created_at', '>=', $request->start_date);
        } elseif ($request->filled('end_date')) {
            $query->where('created_at', '<=', $request->end_date);
        }

        // فیلتر کردن بر اساس فیلدهای اضافی
        if ($request->filled('field1')) {
            $query->where('field1', $request->field1);
        }

        if ($request->filled('field2')) {
            $query->where('field2', $request->field2);
        }

        $records = $query->orderBy('created_at', 'desc')->paginate(15);
        // $Customers = Customer::orderBy('id')->with(['customerType', 'bankInfo'])->get();
        $customers = Customer::orderByDesc('id')->with(['customerType', 'bankInfo'])->paginate(30);
        // $Customers = Customer::orderByDesc('id')->with(['customerType', 'bankInfo'])->lazy(200);
        // return $Customers;

        // return response()->json(['Customers' => $Customers]);
        return response()->json(['customers' =>  $customers], 200);
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
    public function store(StoreCustomerRequest $request)
    {

        try {
            DB::beginTransaction();

            $customer = new Customer;
            $customer->fill($request->validated());
            $customer->save();
            foreach ($request->validated()['types'] as $typeDetailData) {

                $typeDetail = new CustomerType();
                $typeDetail->fill($typeDetailData);
                $typeDetail->customer_id = $customer->id;
                $typeDetail->save();
            }

            try {

                if (isset($request->validated()['bankInfo']) && count($request->validated()['bankInfo']) > 0) {
                    foreach ($request->validated()['bankInfo'] as $info) {

                        $bankDetail = new BankInfo;
                        $bankDetail->fill($info);
                        $bankDetail->customer_id = $customer->id;
                        $bankDetail->save();
                    }
                }
            } catch (\Exception $e) {

                // \Log::error($e->getMessage());
            }
            // اضافه کردن رکوردهای ذخیره شده در دو جدول دیگر به متغییر زیر
            $customer->load('customerType', 'bankInfo');
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            // \Log::error($e->getMessage());
            throw $e;
        }

        return response()->json(['customer' =>  $customer], 200);
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
        $customer->update($request->all());
        $customer->customerType()->delete();
        foreach ($request->validated()['types'] as $typeDetailData) {
            $typeDetail = new CustomerType();
            $typeDetail->fill($typeDetailData);
            $typeDetail->customer_id = $customer->id;
            $typeDetail->save();
        }

        if (isset($request->validated()['bankInfo']) && count($request->validated()['bankInfo']) > 0) {
            $customer->bankInfo()->delete();
            foreach ($request->validated()['bankInfo'] as $info) {

                if ((isset($info['bank']) && (!is_null($info['bank']))) && (!is_null($info['account']) || !is_null($info['card']) || !is_null($info['shaba']))) {
                    $bankDetail = new BankInfo;
                    $bankDetail->fill($info);
                    $bankDetail->customer_id = $customer->id;
                    $bankDetail->save();
                }
            }
        }
        $customer->load('customerType', 'bankInfo');
        return response()->json(['customer' => $customer], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
