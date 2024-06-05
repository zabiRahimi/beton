<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConcreteSalesInvoiceRequest extends FormRequest
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
            'customer_id' => ['required', 'bail','numeric'],
            'truck_id' => ['required','bail','numeric'],
            'driver_id' => ['required','bail','numeric'],
            'concrete_id' => ['required','bail','numeric'],
            'date' => ['required','bail','date'],
            'weight' => ['required','bail','numeric'],
            'cubicMeters' => ['required','bail','numeric'],
            'unitPrice' => ['required','bail','numeric'],
            'totalPrice' => ['required','bail','numeric'],
            'maskanMeli' => ['nullable','bail','string'],
            'vahed' => ['nullable','required_with:maskanMeli','bail','numeric'],
            'address' => ['nullable','bail','string'],
            'concretingPosition' => ['nullable','bail','string'],
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'خریدار را انتخاب کنید',
            'truck_id.required' => 'پلاک میکسر را انتخاب کنید',
            'driver_id.required' => 'راننده را انتخاب کنید',
            'concrete_id.required' => 'عیار بتن را انتخاب کنید',

            'weight.required' => 'وزن بار را بر اساس کیلو‌گرم وارد کنید',
            'weight.numeric' => 'وزن بار را به عدد وارد کنید',

            'cubicMeters.required' => 'وزن بار را براساس متر‌مکعب وارد کنید',
            'cubicMeters.numeric' => 'متر‌مکعب را به عدد وارد کنید',

            'vahed.required_with' => 'هنگام انتخاب مسکن ملی لازم است واحد را وارد کنید',
            'vahed.numeric' => 'واحد را به عدد وارد کنید',
            
        ];
    }
}
