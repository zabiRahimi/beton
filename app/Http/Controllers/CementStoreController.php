<?php

namespace App\Http\Controllers;

use App\Models\CementStore;
use App\Http\Requests\StoreCementStoreRequest;
use App\Http\Requests\UpdateCementStoreRequest;

class CementStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cementStores = CementStore::orderBy('id')->get();

        return response()->json(['cementStores' => $cementStores]);
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
    public function store(StoreCementStoreRequest $request)
    {
        $cementStore = new CementStore();
        $cementStore->fill($request->validated());
        $cementStore->save();

        return response()->json(['cementStore'=>  $cementStore],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(CementStore $cementStore)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CementStore $cementStore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCementStoreRequest $request, CementStore $cementStore)
    {
        $cementStore->update($request->all());

        return response()->json(['cementStore'=>  $cementStore],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CementStore $cementStore)
    {
        //
    }
}
