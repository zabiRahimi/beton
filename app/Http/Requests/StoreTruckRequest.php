<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTruckRequest extends FormRequest
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
            'truckName' => ['required', 'bail','string'],
            'truckType' => ['required','bail','string'],
            // 'numberplate' => ['required','bail','numberplate','unique:trucks'],
            'numberplate' => ['required','bail','unique:trucks'],
            'customer_id' => ['required','bail','numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'مالک خودرو را انتخاب کنید',
        ];
    }
}
