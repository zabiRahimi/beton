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
            'invoice' => ['required', 'array'],
            'invoice.*.time' => ['required','bail','time'],
            'invoice.*.date' => ['required','bail','date'],
            'invoice.*.concrete_id' => ['required','bail','numeric'],
            'invoice.*.unitPrice' => ['required','bail','numeric'],
            'invoice.*.weight' => ['required','bail','numeric'],
            'invoice.*.cubicMeters' => ['required','bail','numeric'],
            'invoice.*.cementStore_id' => ['required','bail','numeric'],
            'invoice.*.totalPrice' => ['required','bail','numeric'],
            'invoice.*.truck_id' => ['required','bail','numeric'],
            'invoice.*.driver_id' => ['required','bail','numeric'],
            'invoice.*.fare' => ['required','bail','numeric'],
            'invoice.*.maskanMeli' => ['nullable','bail','string'],
            'invoice.*.vahed' => ['nullable','required_with:maskanMeli','bail','numeric'],
            'invoice.*.address' => ['nullable','bail','string'],
            'invoice.*.concretingPosition' => ['nullable','bail','string'],
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
