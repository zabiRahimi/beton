<?php

namespace App\Http\Controllers;

use App\Models\WaterStore;
use App\Http\Requests\StoreWaterStoreRequest;
use App\Http\Requests\UpdateWaterStoreRequest;

class WaterStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $waterStores = WaterStore::orderBy('id')->get();

        return response()->json(['waterStores' => $waterStores]);
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
    public function store(StoreWaterStoreRequest $request)
    {
        $waterStore = new WaterStore();
        $waterStore->fill($request->validated());
        $waterStore->save();

        return response()->json(['waterStore'=>  $waterStore],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(WaterStore $waterStore)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WaterStore $waterStore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWaterStoreRequest $request, WaterStore $waterStore)
    {
        $waterStore->update($request->all());

        return response()->json(['waterStore'=>  $waterStore],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WaterStore $waterStore)
    {
        //
    }
}
