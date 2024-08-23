<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetTruckRequest;
use App\Models\Truck;
use App\Http\Requests\StoreTruckRequest;
use App\Http\Requests\UpdateTruckRequest;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;

class TruckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetTruckRequest $request)
    {
        $query = Truck::query();

        if ($request->filled('id')) {
            $query->where('id', $request->id);
        } else {




            if ($request->filled('truckType')) {
                $query->where('truckType', $request->truckType);
            }

            if ($request->filled('name') || $request->filled('lastName')) {

                $query2 = Customer::query();
                if ($request->filled('name')) {
                    $query2->where('name', 'LIKE', "%{$request->name}%"); 
                }

                if ($request->filled('lastName')) {
                    dump($request->lastName);
                    $query2->where('lastName', 'LIKE',  "%{$request->lastName}%"); 

                }
                // $customerIds = DB::table('customers')
                // ->where('name', 'LIKE', "%{$request->name}%")
                // // ->orWhere('lastName', 'LIKE', "%{$request->lastName}%")
                // ->pluck('id'); 
                $customerIds = $query2->pluck('id'); 
                $query->whereIn('customer_id', $customerIds);
            }

            // if ($request->filled('lastName')) {
            //     $query->where('lastName', 'like', "%$request->lastName%");
            // }

            if ($request->filled('numberplate')) {
                $parts = explode('-', $request->numberplate); // جدا کردن رشته بر اساس '-'
                if (!empty($parts[0])) {
                   
                    
                    $query->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 1), "-", -1) LIKE ?', ["%{$parts[0]}%"]);
                }
                
                if (!empty($parts[1])) {
                    $query->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 2), "-", -1) LIKE ?', ["%{$parts[1]}%"]);
                }
                if (!empty($parts[2])) {
                    $query->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 3), "-", -1)  LIKE ?', ["%{$parts[2]}%"]);
                }
                
                if (!empty($parts[3])) {
                    $query->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 4), "-", -1)  LIKE ?', ["%{$parts[3]}%"]);
                   }
               
             
            }
        }

        $trucks = $query->orderBy('id')->paginate(50);
        // dump($trucks);
        return response()->json(['trucks' => $trucks], 200);
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
    public function store(StoreTruckRequest $request)
    {
        $truck = new Truck();
        $truck->fill($request->validated());
        $truck->save();

        return response()->json(['truck' =>  $truck], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Truck $truck)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Truck $truck)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTruckRequest $request, Truck $truck)
    {
        $truck->update($request->all());

        return response()->json(['truck' =>  $truck], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Truck $truck)
    {
        //
    }

    /**
     * Display a listing of the customers who own trucks
     */
    public function truckOwners()
    {
        $truckOwners = Customer::whereHas('customerType', function ($query) {
            $query->where('type', 'مالک');
        })->with(['customerType' => function ($query) {
            $query->where('type', 'مالک');
        }])->get();
        // dd($truckOwners);
        // $truckOwners='truckOmners';
        return response()->json(['truckOwners' =>  $truckOwners], 200);
    }
}
