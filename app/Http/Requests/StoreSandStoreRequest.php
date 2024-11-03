<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSandStoreRequest extends FormRequest
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
            'silo' => ['required', 'bail', 'string', 'unique:sand_stores'],
            'type' => ['required', 'bail', 'numeric', 'in:1,2'],
            'amount' => ['required', 'bail', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'silo.required' => 'نام سیلو را وارد کنید',
            'silo.unique' => 'نام سیلو تکراری است.',
            'type.required' => 'نوع شن‌وماسه را انتخاب کنید',
            'type.in' => 'مقدار نوع شن‌وماسه باید یکی از مقادیر ماسه یا شن باشد'
        ];
    }
}
