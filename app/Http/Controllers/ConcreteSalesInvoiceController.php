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
     * Store a newly created resource in storage.
     */
    public function store(StoreConcreteSalesInvoiceRequest $request)
    {
        try {
            DB::beginTransaction();
            $customer_id = $request->validated()['customer_id'];

            $allResult = [];
            foreach ($request->validated()['invoice'] as $key) {


                $this->cementDeduction($key['cementStore_id'], $key['concrete_id'], $key['cubicMeters']);
                $this->sandDeduction($key['concrete_id'], $key['cubicMeters']);
                $this->waterDeduction($key['concrete_id'], $key['cubicMeters']);
                $this->mixerOwnerSalary($key['ownerId'], $key['fare']);
                $this->customerDebt($customer_id, $key['totalPrice']);

                $concreteSalesInvoice = new ConcreteSalesInvoice;
                $concreteSalesInvoice->customer_id =  $customer_id;
                $concreteSalesInvoice->fill($key);
                $concreteSalesInvoice->save();

                $allResult[] = $concreteSalesInvoice->load('customer', 'concrete', 'cementStore', 'truck.customer', 'driver');
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

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

        return response()->json(['concreteSalesInvoice' =>  $allResult], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConcreteSalesInvoiceRequest $request, ConcreteSalesInvoice $concreteSalesInvoice)
    {
        try {
            DB::beginTransaction();

            $preConcreteSalesInvoice = ConcreteSalesInvoice::with(['truck'])->find($concreteSalesInvoice->id);

            $this->updateCement($request->cementStore_id, $request->concrete_id, $request->cubicMeters, $preConcreteSalesInvoice->cementStore_id, $preConcreteSalesInvoice->concrete_id, $preConcreteSalesInvoice->cubicMeters);

            $this->updateSand($request->concrete_id, $request->cubicMeters, $preConcreteSalesInvoice->concrete_id, $preConcreteSalesInvoice->cubicMeters);

            $this->updateWater($request->concrete_id, $request->cubicMeters, $preConcreteSalesInvoice->concrete_id, $preConcreteSalesInvoice->cubicMeters);

            $this->updateMixerOwner($request->ownerId, $request->fare, $preConcreteSalesInvoice->truck->customer_id, $preConcreteSalesInvoice->fare);

            $this->updateCustomer($request->customer, $request->totalPrice, $preConcreteSalesInvoice->customer, $preConcreteSalesInvoice->totalPrice);

            $concreteSalesInvoice->update($request->all());
            DB::commit();
            dd('done');
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;
            dd('not');
        }
        // return response()->json(['concreteSalesInvoice' =>  $allResult], 200);

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

    private function updateCement(int $cementStoreId, int $concreteId, int|float $cubicMeters, int $preCementStoreId, int $preConcreteId, int|float $preCubicMeters)
    {
        if ($cementStoreId == $preCementStoreId && $concreteId == $preConcreteId && $cubicMeters == $preCubicMeters) {
            /**
             * چون هیچ تغییری در سیلو، نوع سیمان و مقدار بتن ایجاد 
             * نشده است، هیچ عملیاتی انجام نمی ‌گیرد
             */
        } else if ($cementStoreId == $preCementStoreId) {
            $this->updateSameCementStore($cementStoreId, $concreteId, $cubicMeters, $preConcreteId, $preCubicMeters);
        } else {
            $this->updateDifferentCementStore($cementStoreId, $concreteId, $cubicMeters, $preCementStoreId, $preConcreteId, $preCubicMeters);
        }
    }

    private function updateSand(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        if ($concreteId == $preConcreteId && $cubicMeters == $preCubicMeters) {
            /**
             * چون هیچ تغییری در نوع سیمان و مقدار بتن ایجاد 
             * نشده است، هیچ عملیاتی انجام نمی ‌گیرد
             */
        } else {
            $this->updateSandStore($concreteId, $cubicMeters, $preConcreteId, $preCubicMeters);
        }
    }

    private function updateWater(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        if ($concreteId == $preConcreteId && $cubicMeters == $preCubicMeters) {
            /**
             * چون هیچ تغییری در نوع سیمان و مقدار بتن ایجاد 
             * نشده است، هیچ عملیاتی انجام نمی ‌گیرد
             */
        } else {
            $this->updateWaterStore($concreteId, $cubicMeters, $preConcreteId, $preCubicMeters);
        }
    }

    private function updateMixerOwner(int $ownerId, int $fare, int $preOwnerId, int $preFare)
    {
        if ($ownerId == $preOwnerId && $fare == $preFare) {
            # هیچ تغییری در تعویض کامیون و کرایه بار ایجاد نشده
            # بر همین اساس هیچ عملیاتی صورت نمی‌گیرد
        } elseif ($ownerId == $preOwnerId) {
            $this->updateSameMixerOwnerSalary($ownerId, $fare, $preFare);
        } else {
            $this->updateDifferentMixerOwnerSalary($ownerId, $fare, $preOwnerId, $preFare);
        }
    }

    private function updateCustomer(int $customer, int $totalPrice, int $preCustomer, int $pretotalPrice)
    {
        if ($customer == $preCustomer && $totalPrice == $pretotalPrice) {
        } else if ($customer == $preCustomer) {
            $this->updateSameCustomerDept($customer, $totalPrice, $pretotalPrice);
        } else {
            $this->updateDifferentCustomerDept($customer, $totalPrice, $preCustomer, $pretotalPrice);
        }
    }

    /**
     * هنگامی که سیلو تغییر نکرده است، ولی نوع بتن و یا مقدار بتن و یا هردو 
     * تغییر کرده باشد، ابتدا مقدار سیمانی که قبلا از سیلو کسر شده، به سیلو
     * اضافه می شود و سپس مقدار سیمان جدید از سیلو کم می‌شود
     */
    private function updateSameCementStore(int $cementStoreId, int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        $preAmountCement = $this->returnsCementUsed($preConcreteId, $preCubicMeters);
        $amountCement = $this->returnsCementUsed($concreteId, $cubicMeters);

        $cementStore = CementStore::find($cementStoreId);
        $cementStore->amount += $preAmountCement;
        $cementStore->amount -= $amountCement;
        $cementStore->save();
    }

    /**
     * هنگامی که سیلو تغییر کرده باشد، ابتدا مقدار سیمانی که قبلا از سیلوی قبلی کم
     * شده بود به همان سیلو اضافه می شود و سپس مقدار سیمان مصرف شده جدید از سیلوی 
     * فعلی کم می شود
     */
    private function updateDifferentCementStore(int $cementStoreId, int $concreteId, int|float $cubicMeters, int $preCementStoreId, int $preConcreteId, int|float $preCubicMeters)
    {
        $this->increaseCementInStore($preCementStoreId,  $preConcreteId, $preCubicMeters);
        $this->decreaseCementInStore($cementStoreId, $concreteId, $cubicMeters);
    }

    private function increaseCementInStore(int $cementStoreId, int $preConcreteId, int|float $preCubicMeters)
    {
        $preAmountCement = $this->returnsCementUsed($preConcreteId, $preCubicMeters);
        $store = CementStore::find($cementStoreId);
        $store->amount += $preAmountCement;
        $store->save();
    }

    private function decreaseCementInStore(int $cementStoreId, int $concreteId, int|float $cubicMeters)
    {
        $amountCement = $this->returnsCementUsed($concreteId, $cubicMeters);
        $store = CementStore::find($cementStoreId);
        $store->amount -= $amountCement;
        $store->save();
    }

    /**
     *  ابتدا مقدار شن‌و‌ماسه که قبلا از سیلو کسر شده، به سیلو
     * اضافه می شود و سپس مقدار شن‌وماسه مصرف شده جدید از سیلو کم می‌شود
     */
    private function updateSandStore(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        $preAmountSand = $this->returnsSandUsed($preConcreteId, $preCubicMeters);
        $amountSand = $this->returnsSandUsed($concreteId, $cubicMeters);

        $sandStore = SandStore::find(1);
        $sandStore->amount += $preAmountSand;
        $sandStore->amount -= $amountSand;
        $sandStore->save();
    }

    /**
     *  ابتدا مقدار شن‌و‌ماسه که قبلا از سیلو کسر شده، به سیلو
     * اضافه می شود و سپس مقدار شن‌وماسه مصرف شده جدید از سیلو کم می‌شود
     */
    private function updateWaterStore(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        $preAmountWater = $this->returnsWaterUsed($preConcreteId, $preCubicMeters);
        $amountWater = $this->returnsWaterUsed($concreteId, $cubicMeters);

        $waterStore = WaterStore::find(1);
        $waterStore->amount += $preAmountWater;
        $waterStore->amount -= $amountWater;
        $waterStore->save();
    }

    private function updateSameMixerOwnerSalary(int $ownerId, int $fare, int $preFare)
    {
        $financial = Financial::where('customer_id', $ownerId)->first();
        $financial->creditor -= $preFare;
        $financial->creditor += $fare;
        $financial->save();
    }

    /**
     * هنگامی که سیلو تغییر کرده باشد، ابتدا مقدار سیمانی که قبلا از سیلوی قبلی کم
     * شده بود به همان سیلو اضافه می شود و سپس مقدار سیمان مصرف شده جدید از سیلوی 
     * فعلی کم می شود
     */
    private function updateDifferentMixerOwnerSalary(int $ownerId, int $fare, int $preOwnerId, int $preFare)
    {
        $this->decreaseMixerOwnerSalary($preOwnerId, $preFare);
        $this->increaseMixerOwnerSalary($ownerId,  $fare);
    }

    private function decreaseMixerOwnerSalary(int $preOwnerId, int $preFare)
    {

        $financial = Financial::where('customer_id', $preOwnerId)->first();
        $financial->creditor -= $preFare;
        $financial->save();
    }

    private function increaseMixerOwnerSalary(int $ownerId, int $fare)
    {
        $financial = Financial::where('customer_id', $ownerId)->first();
        $financial->creditor += $fare;
        $financial->save();
    }

    private function  updateSameCustomerDept()
    {
    }

    private function updateDifferentCustomerDept()
    {
    }
}
