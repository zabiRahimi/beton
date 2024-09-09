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
            'concrete_id' => 'nullable|numeric',
            'cusotmer_id' => 'nullable|numeric',
            'customerName' => 'nullable|string',
            'custoemrLastName' => 'nullable|string',
            'truck_id' => 'nullable|numeric',
            'numberplate' => 'nullable|date',
            'owner_id' => 'nullable|numeric',
            'ownerName' => 'nullable|string',
            'ownerLastName' => 'nullable|string',
            'driver_id' => 'nullable|numeric',
            'driverName' => 'nullable|string',
            'driverLateName' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'startDate.date' => 'تاریخ شروع جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ شروع را وارد کنید آن را کاملا پاک کنید',
            'endDate.date' => 'تاریخ پایان جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ پایان را وارد کنید آن را کاملا پاک کنید',
            'concrete_id.numeric' => 'شناسه بتن را به عدد وارد کنید',
            'concrete_id.numeric' => 'شناسه مشتری را به عدد وارد کنید',
            'customerName.string' => '|',
            'custoemrLastName.string' => '',
            'truck_id.numeric' => '',
            'numberplate' => '|',
            'owner_id.numeric' => '|',
            'ownerName.string' => '|',
            'ownerLastName.string' => '|',
            'driver_id.numeric' => '|',
            'driverNam.string' => '|',

            'name.string' => 'نام مشتری را صحیح وارد کنید',
            'lastName.string' => 'نام خانوادگی مشتری را صحیح وارد کنید',
        ];
    }
}
