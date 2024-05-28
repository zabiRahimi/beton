<?php

namespace App\Http\Controllers;

use App\Models\SandStore;
use App\Http\Requests\StoreSandStoreRequest;
use App\Http\Requests\UpdateSandStoreRequest;

class SandStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sandStores = SandStore::orderBy('id')->get();

        return response()->json(['sandStores' => $sandStores]);
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
    public function store(StoreSandStoreRequest $request)
    {
        $sandStore = new SandStore();
        $sandStore->fill($request->validated());
        $sandStore->save();

        return response()->json(['sandStore'=>  $sandStore],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(SandStore $sandStore)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SandStore $sandStore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSandStoreRequest $request, SandStore $sandStore)
    {
        $sandStore->update($request->all());

        return response()->json(['sandStore'=>  $sandStore],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SandStore $sandStore)
    {
        //
    }
}
