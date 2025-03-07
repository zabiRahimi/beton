<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetSandRemittanceRequest;
use App\Models\SandRemittance;
use App\Http\Requests\StoreSandRemittanceRequest;
use App\Http\Requests\UpdateSandRemittanceRequest;
use Illuminate\Support\Facades\Log;



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
            // شروط ساده
            $conditions = [
                'buyerName' => $request->buyerName ? '%' . $request->buyerName . '%' : null,
                'buyerLastName' => $request->buyerLastName ? '%' . $request->buyerLastName . '%' : null,
                'buyerFather' => $request->buyerFather ? '%' . $request->buyerFather . '%' : null,
                'price' => $request->price,
                'isCompleted' => $request->isCompleted,
                'factory' => $request->factory,
            ];

            foreach ($conditions as $key => $value) {
                if ($request->filled($key)) {
                    $query->where($key, 'like', $value);
                }
            }

            // شرط تاریخ
            if ($request->filled('date')) {
                $query->where('date', $request->date);
            } elseif ($request->filled('startDate') || $request->filled('endDate')) {
                $query->when($request->filled('startDate') && $request->filled('endDate'), function ($q) use ($request) {
                    $q->whereBetween('created_at', [$request->startDate, $request->endDate]);
                })
                    ->when($request->filled('startDate') && !$request->filled('endDate'), function ($q) use ($request) {
                        $q->where('created_at', '>=', $request->startDate);
                    })
                    ->when(!$request->filled('startDate') && $request->filled('endDate'), function ($q) use ($request) {
                        $q->where('created_at', '<=', $request->endDate);
                    });
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

        return response()->json($sandRemittance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSandRemittanceRequest $request, SandRemittance $sandRemittance)
    {
        $sandRemittance->update($request->all());

        return response()->json(['sandRemittance' =>  $sandRemittance], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SandRemittance $sandRemittance)
    {
        //
    }
}
