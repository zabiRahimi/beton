<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Requests\GetSandInvoiceRequest;
use App\Models\SandInvoice;
use App\Http\Requests\StoreSandInvoiceRequest;
use App\Http\Requests\UpdateSandInvoiceRequest;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\Financial;
use App\Models\SandRemittance;
use App\Models\SandStore;
use App\Models\Truck;

class SandInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetSandInvoiceRequest $request)
    {
        $query = SandInvoice::query();
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
    public function store(StoreSandInvoiceRequest $request)
    {
        try {
            DB::beginTransaction();
            $sandRemittance_id = $request->validated()['sandRemittance_id'];
            $totalPrice = $request->validated()['totalPrice'];

            $dumpTruckOwner_id = $request->validated()['dumpTruckOwner_id'];
            $totalFare = $request->validated()['totalFare'];

            $sandStore_id = $request->validated()['sandStore_id'];
            $weight = $request->validated()['weight'];

            $sandInvoice = new SandInvoice();
            $sandInvoice->fill($request->validated());
            $sandInvoice->save();

            $this->sandRemittanceDeduction($sandRemittance_id, $totalPrice);

            // $this->cementDeduction($key['cementStore_id'], $key['concrete_id'], $key['cubicMeters']);
            // $this->sandDeduction($key['concrete_id'], $key['cubicMeters']);
            // $this->GravelDeduction($key['concrete_id'], $key['cubicMeters']);
            // $this->waterDeduction($key['concrete_id'], $key['cubicMeters']);
            $this->dumpTruckOwnerSalary($dumpTruckOwner_id, $totalFare);
            // $this->customerDebt($customer_id, $key['totalPrice']);
            $this->addingToSandStore($sandStore_id, $weight);





            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;
        }

        return response()->json(['sandInvoice' =>  $sandInvoice], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(SandInvoice $sandInvoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SandInvoice $sandInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSandInvoiceRequest $request, SandInvoice $sandInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SandInvoice $sandInvoice)
    {
        //
    }

    public function fetchData()
    {
        $count = $this->count();
        $sandRemittances = $this->sandRemittances();
        $dumpTrucks = $this->dumpTrucks();
        $drivers = $this->drivers();
        $sandStores = $this->sandStores();

        return response()->json([
            'count' => $count,
            'sandRemittances' => $sandRemittances,
            'dumpTrucks' => $dumpTrucks,
            'drivers' => $drivers,
            'sandStores' => $sandStores
        ]);
    }

    private function count()
    {
        return SandInvoice::count();
    }

    private function sandRemittances()
    {
        return SandRemittance::where('isCompleted', true)->get();
    }

    private function dumpTrucks()
    {
        return Truck::dumpTrucks()->get();
    }

    private function drivers()
    {
        return Driver::get();
    }

    private function sandStores()
    {
        return SandStore::get();
    }

    /**
     * قیمت کل بار را از حواله مربوطه کم می‌کند
     */
    private function sandRemittanceDeduction(int $sandRemittance_id, int|float $totalPrice)
    {

        $sandRemittance = SandRemittance::find($sandRemittance_id);
        $sandRemittance->remainingPrice -= $totalPrice;
        $sandRemittance->save();
    }

    /**
     * کرایه میکسر را به حساب مالک اضافه می کند
     */
    private function dumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare)
    {
        Financial::updateOrCreate(
            ['customer_id' => $dumpTruckOwner_id],
            ['creditor' => DB::raw('creditor + ' . $totalFare)]
        );
    }

    /**
     * #########
     * ###################### update dumpTruck owner account
     * #########
     */

    private function updateDumpTruckOwnerAccount(int $dumpTruckOwner_id, int $totalFare, int $preOwnerId, int $preFare)
    {
        if ($dumpTruckOwner_id == $preOwnerId && $totalFare == $preFare) {
            # هیچ تغییری در تعویض کامیون و کرایه بار ایجاد نشده
            # بر همین اساس هیچ عملیاتی صورت نمی‌گیرد
        } elseif ($dumpTruckOwner_id == $preOwnerId) {
            $this->updateSameDumpTruckOwnerSalary($dumpTruckOwner_id, $totalFare, $preFare);
        } else {
            $this->updateDifferentDumpTruckOwnerSalary($dumpTruckOwner_id, $totalFare, $preOwnerId, $preFare);
        }
    }

    private function updateSameDumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare, int $preFare)
    {
        $financial = Financial::where('customer_id', $dumpTruckOwner_id)->first();
        $financial->creditor -= $preFare;
        $financial->creditor += $totalFare;
        $financial->save();
    }

    /**
     * هنگامی که سیلو تغییر کرده باشد، ابتدا مقدار سیمانی که قبلا از سیلوی قبلی کم
     * شده بود به همان سیلو اضافه می شود و سپس مقدار سیمان مصرف شده جدید از سیلوی 
     * فعلی کم می شود
     */
    private function updateDifferentDumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare, int $preOwnerId, int $preFare)
    {
        $this->decreaseDumpTruckOwnerSalary($preOwnerId, $preFare);
        $this->increaseDumpTruckOwnerSalary($dumpTruckOwner_id,  $totalFare);
    }

    private function decreaseDumpTruckOwnerSalary(int $preOwnerId, int $preFare)
    {

        $financial = Financial::where('customer_id', $preOwnerId)->first();
        $financial->creditor -= $preFare;
        $financial->save();
    }

    private function increaseDumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare)
    {
        $financial = Financial::where('customer_id', $dumpTruckOwner_id)->first();
        $financial->creditor += $totalFare;
        $financial->save();
    }

    /**
     * اضافه کردن وزن بار به سیلوی مربوطه
     */
    private function addingToSandStore(int $sadnStore_id, int $weight)
    {
        $sandStore = SandStore::find($sadnStore_id);
        $sandStore->amount += $weight;
        $sandStore->save();
    }
}
