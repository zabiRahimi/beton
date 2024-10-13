<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSandInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sandSeller_id' => 'required|integer',
            'dumpTruckOwner_id' => 'required|integer',
            'truck_id' => 'required|integer',
            'driver_id' => 'required|integer',
            'sandStore_id' => 'required|integer',
            'referenceNumber' => 'nullable|string',
            'billNumber' => 'required|string',
            'time' => 'required|time',
            'date' => 'required|date',
            'typeSand' => 'required|string',
            'weight' => 'required|integer|digits_between:1,5',
            'unitPrice' => 'required|integer|digits_between:1,10',
            'totalPrice' => 'required|integer|digits_between:1,10',
            'unitFare' => 'required|integer|digits_between:1,10',
            'totalFare' => 'required|integer|digits_between:1,10',
            'description' => 'nullable|string',
        ];
    }
}
