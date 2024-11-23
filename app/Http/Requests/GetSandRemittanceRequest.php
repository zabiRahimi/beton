<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetSandRemittanceRequest extends FormRequest
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
            'startDate'=> 'nullable|date',
            'endDate'=> 'nullable|date',
            'date'=> 'nullable|date',
            'id'=> 'nullable|numeric',
            'buyerName' => ['nullable', 'bail', 'string'],
            'buyerLastName' => ['nullable', 'bail', 'string'],
            'buyerFather' => ['nullable', 'bail', 'string'],
            'remittanceNumber' => ['nullable', 'bail', 'string'],
            'date' => ['nullable', 'bail', 'date'],
            'price' => ['nullable', 'bail', 'numeric'],
            'isCompleted' => ['nullable', 'bail', 'boolean'],
            'factory' => ['nullable', 'bail', 'string'],
        ];
    }
    public function messages(): array
    {
        return [
            'startDate.date' => 'تاریخ شروع جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ شروع را وارد کنید آن را کاملا پاک کنید',
            'endDate.date' => 'تاریخ پایان جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ پایان را وارد کنید آن را کاملا پاک کنید',
            'date.date' => 'تاریخ حواله را صحیح و کامل وارد کنید',
            'id.numeric' => 'شناسه را به عدد وارد کنید',
            'buyerName.string' => 'نام خریدار را صحیح وارد کنید',
            'buyerLastName.string' => 'نام خانوادگی خریدار را صحیح وارد کنید',
            'buyerFather.string' => 'نام پدر را صحیح وارد کنید',
            'remittanceNumber.string' => 'شناسه را به عدد وارد کنید',
            'price.numeric' => 'مبلغ را به عدد وارد کنید',
            'isCompleted.boolean' => 'وضعیت حواله باید یک مقدار بولی باشد',
            'factory.string' => 'کارخانه را وارد کنید',

        ];
    }
}
