<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetSandInvoice;
use App\Models\SandInvoice;
use App\Http\Requests\StoreSandInvoiceRequest;
use App\Http\Requests\UpdateSandInvoiceRequest;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\SandStore;
use App\Models\Truck;

class SandInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetSandInvoice $request)
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
                $queryTruckIds = Truck::whereIn('customer_id',$ownerIds)->pluck('id');
                
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
        //
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

    public function getSandSellers()
    {
        $sandSellers = Customer::sandSellers()->get();
        return response()->json(['sandSellers' => $sandSellers]);
    }

   public function getSandStores() {
    $sandStores = SandStore::get();
    return response()->json(['sandStores' => $sandStores]);
    }
}
