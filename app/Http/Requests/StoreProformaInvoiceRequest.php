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
            'products.*.type' => ['nullable', 'string'],
            'products.*.amount' => ['required', 'numeric'],
            'products.*.unit' => ['required', 'string'],
            'products.*.unitPrice' => ['required', 'numeric'],
            'products.*.totalPrice' => ['required', 'numeric'],
            'description' => ['nullable', 'string'],
            'isTax' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'buyer.required' => 'نام و نام‌خانوادگی خریدار  را وارد کنید',
            'date.required' => 'تاریخ را وارد کنید',
            'date.date' => 'تاریخ را صحیح وارد کنید',
            'products.*.product.required' => 'نام محصول و یا خدمات را وارد کنید',
            'products.*.amount.required' => 'مقدار را به عدد وارد کنید',
            'products.*.amount.numeric' => 'مقدار را صحیح و به عدد وارد کنید',
            'products.*.unit.required' => 'واحد اندازه‌گیری را وارد کنید',
            'products.*.unitPrice.required' => 'قیمت واحد را وارد کنید',
            'products.*.unitPrice.numeric' => 'قیمت واحد را به عدد وارد کنید',
            'products.*.totalPrice.required' => 'قیمت کل پس از وارد کردن مقدار و قیمت واحد بطور خودکار وارد می‌شود',
            'products.*.totalPrice.numeric' => 'قیمت کل صحیح وارد نشده است',
        ];
    }
}
