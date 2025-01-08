<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetProformaInvoiceRequest extends FormRequest
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
            'startDate' => ['nullable', 'date'],
            'endDate' => ['nullable', 'date'],
            'date' => ['nullable', 'date'],
            'id' => ['nullable', 'numeric'],
            'buyer' => ['nullable', 'string'],
            'tel' => ['nullable', 'numeric'],
            'nationalCode' => ['nullable', 'bail','numeric','digits:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'startDate.date' => 'تاریخ شروع جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ شروع را وارد کنید آن را کاملا پاک کنید',
            'endDate.date' => 'تاریخ پایان جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ پایان را وارد کنید آن را کاملا پاک کنید',
            'date.date' => 'تاریخ پیش فاکتور را صحیح و کامل وارد کنید',
            'id.numeric' => 'شناسه را به عدد وارد کنید',
        ];
    }

}
