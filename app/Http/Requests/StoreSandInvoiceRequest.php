<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSandInvoiceRequest extends FormRequest
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
            'billNumber' => ['required', 'string'],
            'sandRemittance_id' => ['required', 'numeric'],
            'time' => ['required', 'time'],
            'date' => ['required', 'date'],
            'sandType' => ['required', 'string'],
            'weight' => ['required', 'bail', 'numeric', 'digits_between:1,5'],
            'unitPrice' => ['required', 'bail', 'numeric', 'digits_between:1,7'],
            'totalPrice' => ['required', 'bail', 'numeric', 'digits_between:1,10'],
            'truck_id' => ['required', 'numeric'],
            'dumpTruckOwner_id' => ['required', 'numeric'],
            'driver_id' => ['required', 'numeric'],
            'unitFare' => ['required', 'bail', 'numeric', 'digits_between:1,7'],
            'totalFare' => ['required', 'bail', 'numeric', 'digits_between:1,10'],
            'sandStore_id' => ['required', 'numeric'],
            'description' => ['nullable', 'string'],
        ];
        
    }

    public function messages(): array
    {
        return [
            'billNumber.required' => ' شماره قبض بارگیری را وارد کنید',
            'billNumber.numeric' => 'شماره قبض را به عدد وارد کنید',

            'sandRemittance_id.required' => 'حواله را انتخاب کنید',
            'sandRemittance_id.numeric' => 'حواله را صحیح وارد کنید',

            'time.required' => 'ساعت ثبت قبض را وارد کنید',
            'date.required' => 'تاریخ ثبت قبض را وارد کنید',

            'sandType.required' => 'نوع شن‌وماسه بارگیری شده را وارد کنید',

            'weight.required' => 'وزن بار را به کیلوگرم وارد کنید',
            'weight.numeric' => 'وزن بار را به عدد وارد کنید',
            'weight.digits_between' => 'مقدار وزن بار منطقی نیست، دقت کنید',

            'unitPrice.required' => 'قیمت واحد شن‌وماسه را وارد کنید',
            'unitPrice.numeric' => 'قیمت به عدد و برحسب تومان وارد کنید',
            'unitPrice.digits_between' => 'قیمت منطقی نیست، قیمت را به تومان وارد کنید',

            'totalPrice.required' => 'قیمت کل شن‌وماسه وارد نشده است',
            'totalPrice.numeric' => 'قیمت کل به عدد وارد نشده است',
            'totalPrice.digits_between' => 'قیمت کل بطور صحیح و برحسب تومان وارد نشده است',

            'truck_id.required' => 'کمپرسی و مالک را انتخاب کنید',
            'truck_id.numeric' => 'کمپرسی صحیح انتخاب نشده است',

            'dumpTruckOwner_id.required' => 'مالک کمپرسی انتخاب نشده است',
            'dumpTruckOwner_id.numeric' => 'مالک کمپرسی صحیح انتخاب نشده است',

            'driver_id.required' => 'راننده کمپرسی را انتخاب کنید',
            'driver_id.integer' => 'راننده به درستی انتخاب نشده است',

            'unitFare.required' => 'کرایه واحد هر تن را وارد کنید کنید',
            'unitFare.numeric' => 'کرایه هر تن را به عدد وارد کنید',
            'unitFare.digits_between' => 'کرایه هر تن را صحیح وارد کنید',

            'totalFare.required' => 'کارخانه شن‌وماسه را انتخاب کنید',
            'totalFare.numeric' => 'کارخانه شن‌وماسه را انتخاب کنید',
            'totalFare.digits_between' => 'کارخانه شن‌وماسه را انتخاب کنید',

            'sandStore_id.required' => 'کارخانه شن‌وماسه را انتخاب کنید',
            'sandStore_id.numeric' => 'کارخانه شن‌وماسه را انتخاب کنید',

        ];
    }
}
