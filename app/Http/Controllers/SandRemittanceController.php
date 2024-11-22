<?php

namespace App\Http\Controllers;

use App\Models\SandRemittance;
use App\Http\Requests\StoreSandRemittanceRequest;
use App\Http\Requests\UpdateSandRemittanceRequest;

class SandRemittanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function count()
    {
        $count = SandRemittance::count();
        return response()->json(['count' => $count], 200);
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
    public function store(StoreSandRemittanceRequest $request)
    {
        $sandRemittance = new SandRemittance();
        $sandRemittance->fill($request->validated());
        $sandRemittance->save();

        return response()->json(['sandRemittance' =>  $sandRemittance], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(SandRemittance $sandRemittance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SandRemittance $sandRemittance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSandRemittanceRequest $request, SandRemittance $sandRemittance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SandRemittance $sandRemittance)
    {
        //
    }
}
