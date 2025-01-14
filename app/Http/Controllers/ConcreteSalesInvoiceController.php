<?php

namespace App\Http\Controllers;

use App\Models\ConcreteSalesInvoice;
use App\Http\Requests\GetConcreteSalesInvoiceRequest;
use App\Http\Requests\StoreConcreteSalesInvoiceRequest;
use App\Http\Requests\UpdateConcreteSalesInvoiceRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

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
    public function index(GetConcreteSalesInvoiceRequest $request)
    {
        $query = ConcreteSalesInvoice::query();
        if ($request->filled('id')) {
            $query->where('id', $request->id);
        } else {
            if ($request->filled('startDate') && $request->filled('endDate')) {
                $query->whereBetween('date', [$request->startDate, $request->endDate]);
            } elseif ($request->filled('startDate')) {
                $query->where('date', '>=', $request->startDate);
            } elseif ($request->filled('endDate')) {
                $query->where('date', '<=', $request->endDate);
            }

            if ($request->filled('concrete_id')) {
                $query->where('concrete_id',  $request->concrete_id);
            }

            if ($request->filled('customer_id')) {
                $query->where('customer_id',  $request->customer_id);
            }

            if ($request->filled('customerName') || $request->filled('customerLastName')) {

                $query2 = Customer::query();
                if ($request->filled('customerName')) {
                    $query2->where('name', 'LIKE', "%{$request->customerName}%");
                }

                if ($request->filled('customerLastName')) {
                    $query2->where('lastName', 'LIKE',  "%{$request->customerLastName}%");
                }
                $customerIds = $query2->pluck('id');
                $query->whereIn('customer_id', $customerIds);
            }

            if ($request->filled('owner_id')) {
                $queryTruck = Truck::query();
                $queryTruck->where('truckType',  'میکسر')
                    ->where('customer_id',  $request->owner_id);

                $truckIds = $queryTruck->pluck('id');
                $query->whereIn('truck_id', $truckIds);
            }

            if ($request->filled('ownerName') || $request->filled('ownerLastName')) {

                $queryCustomer = Customer::query();
                if ($request->filled('ownerName')) {
                    $queryCustomer->where('name', 'LIKE', "%{$request->ownerName}%");
                }

                if ($request->filled('ownerLastName')) {
                    $queryCustomer->where('lastName', 'LIKE',  "%{$request->ownerLastName}%");
                }

                $ownerIds = $queryCustomer->with('customerType')
                    ->whereHas('customerType', function ($queryCustomer) {
                        $queryCustomer->where('code', 5);
                    })
                    ->pluck('id');
                $queryTruckIds = Truck::whereIn('customer_id', $ownerIds)->pluck('id');

                $query->whereIn('truck_id', $queryTruckIds);
            }

            if ($request->filled('truck_id')) {

                $query->where('truck_id', $request->truck_id);
            }

            if ($request->filled('numberplate')) {
                $queryTruck = Truck::query();
                $queryTruck->where('truckType',  'میکسر');
                $parts = explode('-', $request->numberplate); // جدا کردن رشته بر اساس '-'
                if (!empty($parts[0])) {
                    $queryTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 1), "-", -1) LIKE ?', ["%{$parts[0]}%"]);
                }

                if (!empty($parts[1])) {
                    $queryTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 2), "-", -1) LIKE ?', ["%{$parts[1]}%"]);
                }
                if (!empty($parts[2])) {
                    $queryTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 3), "-", -1)  LIKE ?', ["%{$parts[2]}%"]);
                }

                if (!empty($parts[3])) {
                    $queryTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 4), "-", -1)  LIKE ?', ["%{$parts[3]}%"]);
                }
                $truckIds = $queryTruck->pluck('id');
                $query->whereIn('truck_id', $truckIds);
            }

            if ($request->filled('driver_id')) {

                $query->where('driver_id', $request->driver_id);
            }

            if ($request->filled('driverName') || $request->filled('driverLastName')) {

                $queryDriver = Driver::query();
                if ($request->filled('driverName')) {
                    $queryDriver->where('name', 'LIKE', "%{$request->driverName}%");
                }

                if ($request->filled('driverLastName')) {
                    $queryDriver->where('lastName', 'LIKE',  "%{$request->driverLastName}%");
                }

                $driverIds = $queryDriver->pluck('id');

                $query->whereIn('driver_id', $driverIds);
            }
        }

        $concreteSalesInvoices = $query->orderByDesc('id')->with(['customer', 'concrete', 'cementStore', 'truck.customer', 'driver'])->paginate(50);
        return response()->json(['concreteSalesInvoices' => $concreteSalesInvoices], 200);
    }

    public function count()
    {
        // // بررسی اینکه آیا مقدار در کش وجود دارد یا نه
        // $count = Cache::get('concreteSalesInvoice_count');

        // if ($count === null) {
        //     // اگر مقدار در کش وجود نداشته باشد، آن را ذخیره می‌کنیم
        //     $count = ConcreteSalesInvoice::count();
        //     Cache::forever('concreteSalesInvoice_count', $count);
        // }
        // در خط فرمان PHP
        // Cache::forget('concreteSalesInvoice_count');

        $count = Cache::rememberForever('concreteSalesInvoice_count', function () {
            return ConcreteSalesInvoice::count();
        });

        return response()->json(['count' => $count], 200);
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
                $this->GravelDeduction($key['concrete_id'], $key['cubicMeters']);
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

        return response()->json(['concreteSalesInvoice' =>  $allResult], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ConcreteSalesInvoice $concreteSalesInvoice)
    {
        $concreteSalesInvoice->load(['customer', 'driver', 'truck.customer', 'cementStore', 'concrete']);
        return response()->json($concreteSalesInvoice);
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

            $this->updateMixerOwnerAccount($request->ownerId, $request->fare, $preConcreteSalesInvoice->truck->customer_id, $preConcreteSalesInvoice->fare);

            $this->updateCustomerAccount($request->customer_id, $request->totalPrice, $preConcreteSalesInvoice->customer_id, $preConcreteSalesInvoice->totalPrice);

            $concreteSalesInvoice->update($request->all());

            $concreteSalesInvoice->load('customer', 'concrete', 'cementStore', 'truck.customer', 'driver');
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;
            dd('not');
        }

        return response()->json(['concreteSalesInvoice' =>  $concreteSalesInvoice], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ConcreteSalesInvoice $concreteSalesInvoice)
    {
        //
    }

    public function concreteBuyers()
    {

        // Cache::forget('concreteSalesInvoice_concreteBuyers');
        $concreteBuyers = Cache::rememberForever('concreteSalesInvoice_concreteBuyers', function () {
            return Customer::concreteBuyers()->get();
        });

        
        // $concreteBuyers = Customer::concreteBuyers()->get();
        return response()->json(['concreteBuyers' => $concreteBuyers]);
    }

    public function concretes()
    {
        $concretes = Concrete::get();
        return response()->json(['concretes' => $concretes]);
    }

    public function cementStores()
    {
        $cementStores = CementStore::get();
        return response()->json(['cementStores' => $cementStores]);
    }

    /**
     * بررسی وجود سیلوی ماسه شسته
     */
    public function sandStoreExistsSand()
    {
        $exists = SandStore::where('type', 1)->exists();
        return response()->json(['exists' => $exists]);
    }

    /**
     * بررسی وجود سیلوی شن بادامی
     */
    public function sandStoreExistsGravel()
    {
        $exists = SandStore::where('type', 2)->exists();
        return response()->json(['exists' => $exists]);
    }

    public function waterStoreExists()
    {
        $exists = WaterStore::exists();
        return response()->json(['exists' => $exists]);
    }

    public function mixers()
    {
        $mixers = Truck::mixers()->get();
        return response()->json(['mixers' => $mixers]);
    }

    public function drivers()
    {
        $drivers = Driver::get();
        return response()->json(['drivers' => $drivers]);
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
     * مقدار  ماسه شسته مصرف شده را کم می کند
     */
    private function sandDeduction(int $concreteId, int|float $cubicMeters)
    {
        $amount = $this->returnsSandUsed($concreteId, $cubicMeters);
        $sandStore = SandStore::where('type', 1)->first();
        $sandStore->amount -= $amount['amountSand'];
        $sandStore->save();
    }

    /**
     * مقدار  شن بادامی مصرف شده را کم می کند
     */
    private function gravelDeduction(int $concreteId, int|float $cubicMeters)
    {
        $amount = $this->returnsSandUsed($concreteId, $cubicMeters);
        $sandStore = SandStore::where('type', 2)->first();
        $sandStore->amount -= $amount['amountGravel'];
        $sandStore->save();
    }

    /**
     * مقدار مصرف شده آب در یک بار کامیون را از مخزن کم می کند
     */
    private function waterDeduction(int $concreteId, int|float $cubicMeters)
    {
        $amountWater = $this->returnsWaterUsed($concreteId, $cubicMeters);
        $waterStore = WaterStore::first();
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
        $unitAmount = $this->returnUnitAmountSand($concreteId);
        $unitAmountSand = $unitAmount['unitAmountSand'];
        $unitAmountGravel = $unitAmount['unitAmountGravel'];
        $amountSand = $unitAmountSand * $cubicMeters;
        $amountGravel = $unitAmountGravel * $cubicMeters;
        return [
            'amountSand' => $amountSand,
            'amountGravel' => $amountGravel
        ];
    }

    /**
     * محاسبه کل آب مصرف شده در بار
     */
    private function returnsWaterUsed(int $concreteId, int|float $cubicMeters)
    {
        $unitAmountWater = $this->returnUnitAmountWater($concreteId);
        //آب تقریبی مصرف شده در مخزن کامیون و شستشو
        $truckTank = 600;
        $amountWater = ($unitAmountWater * $cubicMeters) + $truckTank;
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

        return [
            'unitAmountSand' => $unitAmountSand,
            'unitAmountGravel' => $unitAmountGravel
        ];
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

    /**
     * #########
     * ###################### update cement store
     * #########
     */

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
     * #########
     * ###################### update sand store
     * #########
     */

    private function updateSand(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        if ($concreteId == $preConcreteId && $cubicMeters == $preCubicMeters) {
            /**
             * چون هیچ تغییری در نوع سیمان و مقدار بتن ایجاد 
             * نشده است، هیچ عملیاتی انجام نمی ‌گیرد
             */
        } else {
            $this->updateSandStoreSand($concreteId, $cubicMeters, $preConcreteId, $preCubicMeters);
            $this->updateSandStoreGravel($concreteId, $cubicMeters, $preConcreteId, $preCubicMeters);
        }
    }

    /**
     *  ابتدا مقدار ماسه شسته که قبلا از سیلو کسر شده، به سیلو
     * اضافه می شود و سپس مقدار ماسه شسته مصرف شده جدید از سیلو کم می‌شود
     */
    private function updateSandStoreSand(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        $preAmount = $this->returnsSandUsed($preConcreteId, $preCubicMeters);
        $amount = $this->returnsSandUsed($concreteId, $cubicMeters);

        $sandStore = SandStore::where('type', 1)->first();
        $sandStore->amount += $preAmount['amountSand'];
        $sandStore->amount -= $amount['amountSand'];
        $sandStore->save();
    }

    /**
     *  ابتدا مقدار شن بادامی که قبلا از سیلو کسر شده، به سیلو
     * اضافه می شود و سپس مقدار شن بادامی مصرف شده جدید از سیلو کم می‌شود
     */
    private function updateSandStoreGravel(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        $preAmount = $this->returnsSandUsed($preConcreteId, $preCubicMeters);
        $amount = $this->returnsSandUsed($concreteId, $cubicMeters);

        $sandStore = SandStore::where('type', 2)->first();
        $sandStore->amount += $preAmount['amountGravel'];
        $sandStore->amount -= $amount['amountGravel'];
        $sandStore->save();
    }

    /**
     * #########
     * ###################### update water store
     * #########
     */

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

    /**
     *  ابتدا مقدار آب که قبلا از مخزن کسر شده، به مخزن
     * اضافه می شود و سپس مقدار آب مصرف شده جدید از مخزن کم می‌شود
     */
    private function updateWaterStore(int $concreteId, int|float $cubicMeters, int $preConcreteId, int|float $preCubicMeters)
    {
        $preAmountWater = $this->returnsWaterUsed($preConcreteId, $preCubicMeters);
        $amountWater = $this->returnsWaterUsed($concreteId, $cubicMeters);

        $waterStore = WaterStore::first();
        $waterStore->amount += $preAmountWater;
        $waterStore->amount -= $amountWater;
        $waterStore->save();
    }

    /**
     * #########
     * ###################### update mixer owner account
     * #########
     */

    private function updateMixerOwnerAccount(int $ownerId, int $fare, int $preOwnerId, int $preFare)
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

    /**
     * #########
     * #########
     */

    private function updateCustomerAccount(int $customerId, int $totalPrice, int $preCustomerId, int $pretotalPrice)
    {
        if ($customerId == $preCustomerId && $totalPrice == $pretotalPrice) {
            #چون هیچ تغییری در کامیون و کرایه کامیون نشده است
            #هیچ عملیاتی صورت نمی‌گیرد
        } else if ($customerId == $preCustomerId) {
            $this->updateSameCustomerDept($customerId, $totalPrice, $pretotalPrice);
        } else {
            $this->updateDifferentCustomerDept($customerId, $totalPrice, $preCustomerId, $pretotalPrice);
        }
    }

    private function  updateSameCustomerDept(int $customerId, int $totalPrice, int $pretotalPrice)
    {
        $financial = Financial::where('customer_id', $customerId)->first();
        $financial->debtor -= $pretotalPrice;
        $financial->debtor += $totalPrice;
        $financial->save();
    }

    private function updateDifferentCustomerDept(int $customerId, int $totalPrice, int $preCustomerId, int $preTotalPrice)
    {
        $this->decreaseCustomerDept($preCustomerId, $preTotalPrice);
        $this->increaseCustomerDept($customerId, $totalPrice);
    }

    private function decreaseCustomerDept(int $perCustomerId, int $perTotalPrice)
    {
        $financial = Financial::where('customer_id', $perCustomerId)->first();
        $financial->debtor -= $perTotalPrice;
        $financial->save();
    }

    private function increaseCustomerDept(int $customerId, int $totalPrice)
    {
        $financial = Financial::where('customer_id', $customerId)->first();
        $financial->debtor += $totalPrice;
        $financial->save();
    }
}
