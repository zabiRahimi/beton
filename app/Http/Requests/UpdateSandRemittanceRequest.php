<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSandRemittanceRequest extends FormRequest
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
            'buyerName' => ['required', 'string'],
            'buyerLastName' => ['required', 'string'],
            'buyerFather' => ['nullable', 'string'],
            'remittanceNumber' => ['nullable', 'string'],
            'date' => ['required', 'date'],
            'price' => ['required', 'numeric'],
            'remainingPrice' => ['nullable', 'numeric'],
            'isCompleted' => ['nullable', 'boolean'],
            'factory' => ['required', 'string'],
            'description' => ['nullable', 'string'],
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
