<?php

namespace App\Http\Controllers;

use App\Models\PersonnelSlip;
use App\Http\Requests\StorePersonnelSlipRequest;
use App\Http\Requests\UpdatePersonnelSlipRequest;
use App\Models\Customer;

class PersonnelSlipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorePersonnelSlipRequest $request)
    {
        $personnelSlip = new PersonnelSlip();
        $personnelSlip->fill($request->validated());
        $personnelSlip->save();

        return response()->json(['personnelSlip'=>  $personnelSlip],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(PersonnelSlip $personnelSlip)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PersonnelSlip $personnelSlip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonnelSlipRequest $request, PersonnelSlip $personnelSlip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PersonnelSlip $personnelSlip)
    {
        //
    }

     /**
     * Display a listing of the customers who is personnel
     */
    public function personnels(){
        $personnels = Customer::whereHas('customerType', function ($query) {
            $query->where('type', 'پرسنل');
        })->with(['customerType' => function ($query) {
            $query->where('type', 'پرسنل');
        }])->get();
        // dd($personnels);
        
        return response()->json(['personnels'=>  $personnels],200);
    }
}
