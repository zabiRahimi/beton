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
        return false;
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
            'lastName' => ['required', 'bail', 'numeric'],
            'nationalCode' => [
                'required', 'bail', 'numeric',
                Rule::unique('drivers')->ignore($this->driver)
            ],
            'dateOfBirth' => ['required', 'bail', 'numeric'],
            'mobile' => [
                'required', 'bail', 'string',
                Rule::unique('drivers')->ignore($this->driver)
            ],
            'address' => ['nullable', 'bail', 'numeric'],
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
