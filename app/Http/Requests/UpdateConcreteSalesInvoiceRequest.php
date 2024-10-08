<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConcreteSalesInvoiceRequest extends FormRequest
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
            'time' => ['required','bail','time'],
            'date' => ['required','bail','date'],
            'concrete_id' => ['required','bail','numeric'],
            'unitPrice' => ['required','bail','numeric'],
            'weight' => ['required','bail','numeric'],
            'cubicMeters' => ['required','bail','numeric'],
            'cementStore_id' => ['required','bail','numeric'],
            'totalPrice' => ['required','bail','numeric'],
            'truck_id' => ['required','bail','numeric'],
            'ownerId' => ['required','bail','numeric'],
            'driver_id' => ['required','bail','numeric'],
            'fare' => ['required','bail','numeric'],
            'maskanMeli' => ['nullable','bail','string'],
            'vahed' => ['nullable','required_with:maskanMeli','bail','numeric'],
            'address' => ['nullable','required_without:maskanMeli','bail','string'],
            'concretingPosition' => ['required','bail','string'],
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

            'fare.required' => 'کرایه میکسر را وارد کنید',
            'fare.numeric' => 'کرایه میکسر را صحیح وارد کنید.',

            'vahed.required_with' => 'هنگام انتخاب مسکن ملی لازم است واحد را وارد کنید',
            'vahed.numeric' => 'واحد را به عدد وارد کنید',
            'address.required_without' => 'آدرس را وارد کنید و اگر بتن برای یکی از مسکن‌های ملی است، بجای وارد کردن آدرس آن را انتخاب کنید',
            
        ];
    }
}
