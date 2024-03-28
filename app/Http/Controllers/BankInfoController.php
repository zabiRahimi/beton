<?php

namespace App\Http\Controllers;

use App\Models\BankInfo;
use App\Http\Requests\StoreBankInfoRequest;
use App\Http\Requests\UpdateBankInfoRequest;

class BankInfoController extends Controller
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
    public function store(StoreBankInfoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(BankInfo $bankInfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BankInfo $bankInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBankInfoRequest $request, BankInfo $bankInfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BankInfo $bankInfo)
    {
        //
    }
}
