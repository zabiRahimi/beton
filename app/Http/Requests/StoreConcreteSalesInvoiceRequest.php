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
            // 'customer_id' => ['required', 'bail','numeric'],
            // 'invoice' => ['required', 'array'],
            // 'invoice.*.time' => ['required','bail','time'],
            // 'invoice.*.date' => ['required','bail','date'],
            'invoice.*.concrete_id' => ['required','bail','numeric'],
            // 'invoice.*.unitPrice' => ['required','bail','numeric'],
            // 'invoice.*.weight' => ['required','bail','numeric'],
            'invoice.*.cubicMeters' => ['required','bail','numeric'],
            'invoice.*.cementStore_id' => ['required','bail','numeric'],
            // 'invoice.*.totalPrice' => ['required','bail','numeric'],
            // 'invoice.*.truck_id' => ['required','bail','numeric'],
            'invoice.*.ownerId' => ['required','bail','numeric'],
            // 'invoice.*.driver_id' => ['required','bail','numeric'],
            'invoice.*.fare' => ['required','bail','numeric'],
            // 'invoice.*.maskanMeli' => ['nullable','bail','string'],
            // 'invoice.*.vahed' => ['nullable','required_with:invoice.*.maskanMeli','bail','numeric'],
            // 'invoice.*.address' => ['nullable','required_without:invoice.*.maskanMeli','bail','string'],
            // 'invoice.*.concretingPosition' => ['required','bail','string'],
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'خریدار را انتخاب کنید',
            'invoice.*.address.required_without'=>'آدرس را وارد کنید و اگر بار برای یکی از مسکن‌های ملی است، بجای وارد کردن آدرس آن را انتخاب کنید',
            'invoice.*.vahed.required_with' => 'هنگامی که مسکن ملی را انتخاب می‌کنید لازم است شماره واحد را وارد کنید.',
            
        ];
    }
}
