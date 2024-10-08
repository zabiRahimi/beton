<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetDriverRequest;
use App\Models\Driver;
use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetDriverRequest $request)
    {
        $query = Driver::query();

        if ($request->filled('id')) {
            $query->where('id', $request->id);
        } else {

            if ($request->filled('name')) {
                $query->where('name', 'LIKE', "%{$request->name}%");
            }

            if ($request->filled('lastName')) {
                $query->where('lastName', 'LIKE',  "%{$request->lastName}%");
            }
        }
        $drivers = $query->orderByDesc('id')->paginate(50);

        return response()->json(['drivers' => $drivers]);
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
    public function store(StoreDriverRequest $request)
    {
        $driver = new Driver();
        $driver->fill($request->validated());
        $driver->save();

        return response()->json(['driver' =>  $driver], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Driver $driver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDriverRequest $request, Driver $driver)
    {
        $driver->update($request->all());

        return response()->json(['driver' =>  $driver], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        //
    }
}
