<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetSandRemittanceRequest;
use App\Models\SandRemittance;
use App\Http\Requests\StoreSandRemittanceRequest;
use App\Http\Requests\UpdateSandRemittanceRequest;

class SandRemittanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetSandRemittanceRequest $request)
    {
        $query = SandRemittance::query();

        if ($request->filled('id')) {
            $query->where('id', $request->id);
        } elseif ($request->filled('remittanceNumber')) {
            $query->where('remittanceNumber', $request->remittanceNumber);
        } else {

            if ($request->filled('startDate') && $request->filled('endDate')) {
                $query->whereBetween('created_at', [$request->startDate, $request->endDate]);
            } elseif ($request->filled('startDate')) {
                $query->where('created_at', '>=', $request->startDate);
            } elseif ($request->filled('endDate')) {
                $query->where('created_at', '<=', $request->endDate);
            }

            if ($request->filled('date')) {
                $query->where('date',  $request->date);
            }

            if ($request->filled('buyerName')) {
                $query->where('buyerName', 'like', "%$request->buyerName%");
            }

            if ($request->filled('buyerLastName')) {
                $query->where('buyerLastName', 'like', "%$request->buyerLastName%");
            }

            if ($request->filled('buyerFather')) {
                $query->where('buyerFather', 'like', "%$request->buyerFather%");
            }

            if ($request->filled('price')) {
                $query->where('price', "$request->price");
            }

            if ($request->filled('isCompleated')) {
                $query->where('isCompleated', "$request->isCompleated");
            }

            if ($request->filled('factory')) {
                $query->where('factory', "$request->factory");
            }
        }

        $sandRemittances = $query->orderByDesc('id')->paginate(50);

        return response()->json(['sandRemittances' =>  $sandRemittances], 200);
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
