<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetConcreteSalesInvoiceRequest extends FormRequest
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
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date',
            'id' => 'nullable|numeric',
            'concrete_id' => 'nullable|numeric',
            'customer_id' => 'nullable|numeric',
            'customerName' => 'nullable|string',
            'customerLastName' => 'nullable|string',
            'truck_id' => 'nullable|numeric',
            'numberplate' => 'nullable|string',
            'owner_id' => 'nullable|numeric',
            'ownerName' => 'nullable|string',
            'ownerLastName' => 'nullable|string',
            'driver_id' => 'nullable|numeric',
            'driverName' => 'nullable|string',
            'driverLastName' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'startDate.date' => 'تاریخ شروع جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ شروع را وارد کنید آن را کاملا پاک کنید',
            'endDate.date' => 'تاریخ پایان جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ پایان را وارد کنید آن را کاملا پاک کنید',
            'id.numeric' => 'شماره قبض را به عدد وارد کنید',
            'concrete_id.numeric' => 'شناسه بتن را به عدد وارد کنید',
            'customer_id.numeric' => 'شناسه مشتری را به عدد وارد کنید',
            'customerName.string' => 'نام خریدار را صحیح وارد کنید',
            'customerLastName.string' => ' نام خانوادگی خریدار را صحیح وارد کنید',
            'truck_id.numeric' => 'شناسه میکسر را به عدد وارد کنید',
            'numberplate.string' => 'شماره پلاک را صحیح وارد کنید',
            'owner_id.numeric' => 'شناسه مالک میکسر را به عدد وارد کنید',
            'ownerName.string' => 'نام مالک میکسر را صحیح وارد کنید',
            'ownerLastName.string' => 'نام خانوادگی مالک میکسر را صحیح وارد کنید',
            'driver_id.numeric' => 'شناسه راننده را به عدد وارد کنید',
            'driverName.string' => 'نام راننده را صحیح وارد کنید',
            'driverLastName.string' => 'نام خانوادگی راننده را صحیح وارد کنید',
        ];
    }
}
