<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetTruckRequest extends FormRequest
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
            
            'id'=> 'nullable|numeric',
            'truckType' => 'nullable | string',
            'name' => 'nullable|string',
            'lastName' => 'nullable|string',
            'namberplate' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id.numeric' => 'شناسه را به عدد وارد کنید',
            'truckType.*.string' => 'نوع مشتری را انتخاب کنید',
            'name.string' => 'نام مالک را صحیح وارد کنید',
            'lastName.string' => 'نام خانوادگی مالک را صحیح وارد کنید',
            'namberplate.string'=>'شماره پلاک را صحیح وارد کنید'
        ];
    }
}
