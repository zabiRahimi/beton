<?php

namespace App\Http\Controllers;

use App\Models\Concrete;
use App\Http\Requests\StoreConcreteRequest;
use App\Http\Requests\UpdateConcreteRequest;

class ConcreteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConcreteRequest $request)
    {
        $concrete = new Concrete();
        $concrete->fill($request->validated());
        $concrete->save();

        return response()->json(['concrete'=>  $concrete],200);
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Concrete $concrete)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Concrete $concrete)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConcreteRequest $request, Concrete $concrete)
    {
        $concrete->update($request->all());

        return response()->json(['concrete'=>  $concrete],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Concrete $concrete)
    {
        //
    }
}
