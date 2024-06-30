<?php

namespace App\Http\Controllers;

use App\Models\ConcreteSalesInvoice;
use App\Http\Requests\StoreConcreteSalesInvoiceRequest;
use App\Http\Requests\UpdateConcreteSalesInvoiceRequest;
use Illuminate\Support\Facades\DB;

use App\Models\CementStore;
use App\Models\Concrete;
use App\Models\Customer;
use App\Models\Driver;
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
        try {
            // $customer_id = $request->validated()['customer_id'];
            // dd($request->validated()['invoice']);
            foreach ($request->validated()['invoice'] as $typeDetailData) {

                $this->getAmountSand($typeDetailData['concrete_id']);
                // $this->cementDeduction($typeDetailData['cementStore_id'], $typeDetailData['concrete_id']);
                // $concreteSalesInvoice = new ConcreteSalesInvoice;
                // $concreteSalesInvoice->customer_id =  $customer_id;
                // $concreteSalesInvoice->fill($typeDetailData);
                // $concreteSalesInvoice->save();
            }
            dd('ok');
        } catch (\Throwable $th) {
            throw $th;
        }
        // try {
        //     DB::beginTransaction();

        //     $customer = new Customer;
        //     $customer->fill($request->validated());
        //     $customer->save();
        //     foreach ($request->validated()['types'] as $typeDetailData) {

        //         $typeDetail = new CustomerType();
        //         $typeDetail->fill($typeDetailData);
        //         $typeDetail->customer_id = $customer->id;
        //         $typeDetail->save();
        //     }

        //     try {

        //         if (isset($request->validated()['bankInfo']) && count($request->validated()['bankInfo']) > 0) {
        //             foreach ($request->validated()['bankInfo'] as $info) {

        //                 $bankDetail = new BankInfo;
        //                 $bankDetail->fill($info);
        //                 $bankDetail->customer_id = $customer->id;
        //                 $bankDetail->save();
        //             }
        //         }
        //     } catch (\Exception $e) {

        //         // \Log::error($e->getMessage());
        //     }
        //     // اضافه کردن رکوردهای ذخیره شده در دو جدول دیگر به متغییر زیر
        //     $customer->load('customerType', 'bankInfo');
        //     DB::commit();
        // } catch (\Exception $e) {
        //     DB::rollback();
        //     // \Log::error($e->getMessage());
        //     throw $e;
        // }

        // return response()->json(['customer' =>  $customer], 200);
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

        return response()->json(['concreteBuyers' => $concreteBuyers]);
    }

    public function getCSIConcretes()
    {
        $concretes = Concrete::get();
        return response()->json(['concretes' => $concretes]);
    }

    public function getCSIMixers()
    {
        $mixers = Truck::getMixers();
        return response()->json(['mixers' => $mixers]);
    }

    public function getCSIDrivers()
    {
        $drivers = Driver::get();
        return response()->json(['drivers' => $drivers]);
    }

    public function getCSICementStores()
    {
        $cementStores = CementStore::get();
        return response()->json(['cementStores' => $cementStores]);
    }

    private function waterDeduction(int $concreteId)
    {
        $amountWater = $this->getAmountWater($concreteId);

        $cementStore = CementStore::find($amountWater);
        $cementStore->amount -= $amountWater;
        $cementStore->save();
    }

    private function cementDeduction(int $cementStoreId, int $concreteId)
    {
        $amountCement = $this->getAmountCement($concreteId);

        $cementStore = CementStore::find($cementStoreId);
        $cementStore->amount -= $amountCement;
        $cementStore->save();
    }

    private function sandDeduction($concreteId)
    {
        $amountCement = $this->getAmountCement($concreteId);

        $cementStore = CementStore::find($amountCement);
        $cementStore->amount -= $amountCement;
        $cementStore->save();
    }

    private function customerDebt()
    {
    }

    private function mixerOwnerSalary()
    {
    }

    private function getAmountCement(int $concreteId)
    {
        $amountCement = Concrete::find($concreteId)->value('amountCement');
        return $amountCement;
    }

    private function getAmountWater(int $concreteId)
    {
        $amountWater = Concrete::find($concreteId)->value('amountWater');
        return $amountWater;
    }

    private function getAmountSand(int $concreteId)
    {
        // $amountSand = Concrete::find($concreteId)->selectRaw('SUM(amountSand + amountGravel) as total')
        // ->value('total');
        // dd($concreteId);
        // $amountSand = Concrete::find($concreteId)->value('amountSand');
        $concrete= Concrete::find($concreteId);
        $amountSand=$concrete->amountSand;
        $amountGravel=$concrete->amountGravel;
        // $amountGravel = Concrete::find($concreteId)->value('amountGravel');
        // ->sum(function ($row) {
        //     return $row->amountSand + $row->amountGravel;
        // });
        // dd($amountSand + $amountGravel, $concreteId, $amountGravel, $amountSand);
        dd( $concreteId, $amountGravel, $amountSand);
        // return $amountSand;
    }
}
