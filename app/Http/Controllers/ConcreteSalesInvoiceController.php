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
use App\Models\Financial;
use App\Models\SandStore;
use App\Models\Truck;
use App\Models\WaterStore;

class ConcreteSalesInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $concreteSalesInvoices = ConcreteSalesInvoice::orderBy('id')->with(['customer', 'concrete', 'cementStore', 'truck.customer', 'driver'])->get();

        return response()->json(['concreteSalesInvoices' => $concreteSalesInvoices], 200);
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
            $customer_id = $request->validated()['customer_id'];
            // dd($request->validated()['invoice']);
            $allResult=[];
            foreach ($request->validated()['invoice'] as $key) {


                $this->cementDeduction($key['cementStore_id'], $key['concrete_id'], $key['cubicMeters']);
                $this->sandDeduction(
                    $key['concrete_id'],
                    $key['cubicMeters']
                );
                $this->waterDeduction($key['concrete_id'], $key['cubicMeters']);
                $this->mixerOwnerSalary($key['ownerId'], $key['fare']);
                $this->customerDebt($customer_id, $key['totalPrice']);

                $concreteSalesInvoice = new ConcreteSalesInvoice;
                $concreteSalesInvoice->customer_id =  $customer_id;
                $concreteSalesInvoice->fill($key);
                $concreteSalesInvoice->save();

                // $concreteSalesInvoice = ConcreteSalesInvoice::create([
                //     'customer_id' => $customer_id,
                //     'time' => $key['time'],
                //     'date' => $key['date'],
                //     'concrete_id' => $key['concrete_id'],
                //     'unitPrice' => $key['unitPrice'],
                //     'weight' => $key['weight'],
                //     'cubicMeters' => $key['cubicMeters'],
                //     'cementStore_id' => $key['cementStore_id'],
                //     'totalPrice' => $key['totalPrice'],
                //     'truck_id' => $key['truck_id'],
                //     'ownerId' => $key['ownerId'],
                //     'driver_id' => $key['driver_id'],
                //     'fare' => $key['fare'],
                //     'maskanMeli' => $key['maskanMeli'],
                //     'vahed' => $key['vahed'],
                //     'address' => $key['address'],
                //     'concretingPosition' => $key['concretingPosition']
                // ]);
                $allResult[]= $concreteSalesInvoice->load('customer','concrete', 'cementStore', 'truck.customer', 'driver');

            }
        } catch (\Throwable $th) {
            throw $th;
            dd('not');
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

        return response()->json(['concreteSalesInvoice' =>  $allResult], 200);
    }

    // public function store(StoreConcreteSalesInvoiceRequest $request)
    // {
    //     try {
    //         $customer_id = $request->validated()['customer_id'];
    //         foreach ($request->validated()['invoice'] as $key) {

    //             $concreteSalesInvoice = new ConcreteSalesInvoice;
    //             $concreteSalesInvoice->customer_id =  $customer_id;
    //             $concreteSalesInvoice->fill($key);
    //             $concreteSalesInvoice->save();


    //         }

    //     } catch (\Throwable $th) {
    //         throw $th;
    //     }


    //     return response()->json(['concreteSalesInvoice' =>  $concreteSalesInvoice], 200);
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConcreteSalesInvoiceRequest $request, ConcreteSalesInvoice $concreteSalesInvoice)
    {
        $concreteSalesInvoice->update($request->all());
        dd('dddd');
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



    /**
     * مقدار سیمان مصرف شده را از سیلو مورد نظر کم می کند
     */
    private function cementDeduction(int $cementStoreId, int $concreteId, int|float $cubicMeters)
    {
        $amountCement = $this->returnsCementUsed($concreteId, $cubicMeters);

        $cementStore = CementStore::find($cementStoreId);
        $cementStore->amount -= $amountCement;
        $cementStore->save();
    }

    /**
     * مقدار شن و ماسه مصرف شده را کم می کند
     */
    private function sandDeduction(int $concreteId, int|float $cubicMeters)
    {
        $amountSand = $this->returnsSandUsed($concreteId, $cubicMeters);

        $sandStore = SandStore::find(1);
        $sandStore->amount -= $amountSand;
        $sandStore->save();
    }

    /**
     * مقدار مصرف شده آب در یک بار کامیون را از مخزن کم می کند
     */
    private function waterDeduction(int $concreteId, int|float $cubicMeters)
    {
        $amountWater = $this->returnsWaterUsed($concreteId, $cubicMeters);

        $waterStore = WaterStore::find(1);
        $waterStore->amount -= $amountWater;
        $waterStore->save();
    }

    /**
     * محاسبه کل سیمان مصرف شده در بار
     */
    private function returnsCementUsed(int $concreteId, int|float $cubicMeters)
    {
        $unitAmountCement = $this->returnUnitAmountCement($concreteId);
        $amountCement = $unitAmountCement * $cubicMeters;

        return $amountCement;
    }

    /**
     * محاسبه کل شن و ماسه مصرف شده در بار
     */
    private function returnsSandUsed(int $concreteId, int|float $cubicMeters)
    {
        $unitAmountSand = $this->returnUnitAmountSand($concreteId);
        $amountSand = $unitAmountSand * $cubicMeters;
        return $amountSand;
    }

    /**
     * محاسبه کل آب مصرف شده در بار
     */
    private function returnsWaterUsed(int $concreteId, int|float $cubicMeters)
    {
        $unitAmountWater = $this->returnUnitAmountWater($concreteId);
        $amountWater = $unitAmountWater * $cubicMeters;

        return $amountWater;
    }

    /**
     * مقدار مصرفی سیمان در هر متر بتن بسته به نوع بتن را برمی‌گرداند
     */
    private function returnUnitAmountCement(int $concreteId)
    {
        $concrete = Concrete::find($concreteId);
        $unitAmountCement = $concrete->amountCement;
        return $unitAmountCement;
    }

    /**
     * مجموع مقدار شن و ماسه مصرفی در هر متر بتن
     */
    private function returnUnitAmountSand(int $concreteId)
    {
        $concrete = Concrete::find($concreteId);
        $unitAmountSand = $concrete->amountSand;
        $unitAmountGravel = $concrete->amountGravel;
        $totalUnitSand = $unitAmountSand + $unitAmountGravel;
        return $totalUnitSand;
    }

    /**
     * مقدار مصرف آب در هر متر بتن
     */
    private function returnUnitAmountWater(int $concreteId)
    {
        $concrete = Concrete::find($concreteId);
        $unitAmountWater = $concrete->amountWater;
        return $unitAmountWater;
    }



    /**
     * مبلغ بتن را به بدهی مشتری اضافه می کند
     */
    private function customerDebt(int $customerId, int $totalPrice)
    {
        Financial::updateOrCreate(
            ['customer_id' => $customerId],
            ['debtor' => DB::raw('debtor + ' . $totalPrice)]
        );
    }

    /**
     * کرایه میکسر را به حساب مالک اضافه می کند
     */
    private function mixerOwnerSalary(int $ownerId, int $fare)
    {
        Financial::updateOrCreate(
            ['customer_id' => $ownerId],
            ['creditor' => DB::raw('creditor + ' . $fare)]
        );
    }
}
