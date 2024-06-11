<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateDriverRequest extends FormRequest
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
            'name' => ['required', 'bail', 'string'],
            'lastName' => ['required', 'bail', 'string'],
            'father' => ['nullable', 'bail', 'string'],
            'nationalCode' => [
                'nullable', 'bail', 'numeric','digits:10',
                Rule::unique('drivers')->ignore($this->driver)
            ],
            'dateOfBirth' => ['nullable', 'bail', 'date'],
            'mobile' => [
                'nullable', 'bail', 'mobile',
                Rule::unique('drivers')->ignore($this->driver)
            ],
            'address' => ['nullable', 'bail', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'نام مشتری را وارد کنید',
            'lastName.required' => 'نام خانوادگی مشتری را وارد کنید',
        ];
    }
}
