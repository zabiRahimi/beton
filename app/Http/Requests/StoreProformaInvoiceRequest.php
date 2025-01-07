<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProformaInvoiceRequest extends FormRequest
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
            'date' => ['required', 'date'],
            'buyer' => ['required', 'string'],
            'nationalCode' => ['nullable', 'bail','numeric','digits:10'],
            'address' => ['required', 'string'],
            'tel' => ['nullable', 'numeric'],
            'products' => ['required', 'array'],
            'products.*.product' => ['required', 'string'],
            'products.*.type' => ['required', 'string'],
            'products.*.amount' => ['required', 'numeric'],
            'products.*.unit' => ['required', 'string'],
            'products.*.unitPrice' => ['required', 'numeric'],
            'products.*.totalprice' => ['required', 'numeric'],
            'description' => ['nullable', ''],
            'isTax' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'buyerName.required' => 'نام خریدار حواله را وارد کنید',
            'buyerLastName.required' => 'نام خانوادگی خریدار حواله را وارد کنید',
            'date.required' => 'تاریخ ثبت حواله را وارد کنید',
            'remittanceNumber.string' => 'شماره حواله را صحیح وارد کنید',
            'price.required' => 'مبلغ حواله را وارد کنید',
            'price.numeric' => 'مبلغ حواله را به عدد و به تومان وارد کنید',
            'remainingPrice.numeric' => 'مبلغ مانده را به عدد و به تومان وارد کنید',
            'factory.required' => 'کارخانه شن‌وماسه را انتخاب کنید',

        ];
    }
}
