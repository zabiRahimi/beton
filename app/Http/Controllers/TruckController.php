<?php

namespace App\Http\Controllers;

use App\Models\Truck;
use App\Http\Requests\StoreTruckRequest;
use App\Http\Requests\UpdateTruckRequest;
use App\Models\Customer;

class TruckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trucks = Truck::orderBy('id')->get();

        return response()->json(['trucks' => $trucks]);
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

        return response()->json(['truck'=>  $truck],200);
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

        return response()->json(['truck'=>  $truck],200);
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
    public function truckOwners(){
        $truckOwners = Customer::whereHas('customerType', function ($query) {
            $query->where('type', 'مالک');
        })->with(['customerType' => function ($query) {
            $query->where('type', 'مالک');
        }])->get();
        // dd($truckOwners);
        // $truckOwners='truckOmners';
        return response()->json(['truckOwners'=>  $truckOwners],200);
    }
}
