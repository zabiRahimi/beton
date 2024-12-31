<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetSandInvoiceRequest extends FormRequest
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
            'billNumber' => ['nullable', 'numeric'],
            'sandType' => ['nullable', 'string'],
            'sandStoreId' => ['nullable', 'numeric'],
            'dumpTruckOwnerId' => ['nullable', 'numeric'],
            'dumpTruckOwnerName' => ['nullable', 'string'],
            'dumpTruckOwnerLastName' => ['nullable', 'string'],
            'dumpTruckId' => ['nullable', 'numeric'],
            'numberplate' => ['nullable', 'string'],
            'driverId' => ['nullable', 'numeric'],
            'driverName' => ['nullable', 'string'],
            'driverLastName' => ['nullable', 'string'],
            'sandRemittanceId' => ['nullable', 'numeric'],
            'sandRemittanceNumber' => ['nullable', 'string'],
            'sandRemittanceBuyerName' => ['nullable', 'string'],
            'sandRemittanceBuyerLastName' => ['nullable', 'string'],
            'sandRemittancePrice' => ['nullable', 'numeric'],
            'factory' => ['nullable', 'string'],
        ];
    }
    public function messages(): array
    {
        return [
            'startDate.date' => 'تاریخ شروع جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ شروع را وارد کنید آن را کاملا پاک کنید',
            'endDate.date' => 'تاریخ پایان جستجو را صحیح وارد کنید، چنانچه نمی‌خواهید تاریخ پایان را وارد کنید آن را کاملا پاک کنید',
            'id.numeric' => 'شناسه را به عدد وارد کنید',
            'date.date' => 'تاریخ حواله را صحیح و کامل وارد کنید',
            'billNumber.numeric' => 'شماره قبض را به عدد وارد کنید',
            'sandType.string' => 'نوع شن و ماسه را درست  انتخاب کنید',
            'sandStoreId.numeric' => 'سیلوی تخلیه را به درستی وارد کنید',
            'dumpTruckOwnerId.numeric' => 'شناسه مالک کمپرسی را به عدد وارد کنید',
            'dumpTruckOwnerName.string' => 'نام مالک کمپرسی را صحیح وارد کنید',
            'dumpTruckOwnerLastName.string' => 'نام خانوادگی را صحیح وارد کنید',
            'dumpTruckId.numeric' => 'شناسه کمپرسی را به عدد وارد کنید',
            'numberplate.string' => 'هر قسمت از پلاک را صحیح وارد کنید',
            'driverId.numeric' => 'شناسه راننده را به عدد وارد کنید',
            'driverName.string' => 'نام راننده را صحیح وارد کنید',
            'driverLastName.string' => 'نام خانوادگی راننده را صحیح وارد کنید',
            'sandRemittanceId.numeric' => 'شناسه حواله را به عدد وارد کنید',
            'sandRemittanceNumber.string' => 'شماره حواله را صحیح وارد کنید',
            'sandRemittanceBuyerName.string' => 'نام خریدار حواله را صحیح وارد کنید',
            'sandRemittanceBuyerLastName.string' => 'نام خانوادگی خریدار حواله را صحیح وارد کنید',
            'sandRemittancePrice.numeric' => 'قیمت حواله به عدد و برحسب تومان وارد کنید',
            'factory.string' => 'نام کارخانه را درست انتخاب کنید',

        ];
    }
}
