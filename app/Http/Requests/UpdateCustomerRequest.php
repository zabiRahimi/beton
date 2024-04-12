<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateCustomerRequest extends FormRequest
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
            'name' => 'required|string',
            'lastName' => 'required|string',
            'father' => 'nullable|string',
            'types' => ['required', 'array'],
            'types.*' => ['required', 'integer', 'exists:customer_types,id'],
            'nationalCode' => [
                'nullable', 'bail', 'numeric', 'digits:10',
                Rule::unique('customers')->ignore($this->customer)
            ],
            'dateOfBirth' => 'nullable|date',
            'mobile' => [
                'nullable', 'bail', 'mobile', Rule::unique('customers')->ignore($this->customer)
            ],
            'telephone' => 'nullable|bail|tel',
            'email' => ['nullable', 'bail', 'email:rfc', Rule::unique('customers')->ignore($this->customer)],
            'postalCode' => 'nullable|bail|numeric|digits:10',
            'address' => 'nullable|string',
            'bankInfo' => 'nullable|array',
            'bankInfo.*' => 'nullable|array',
            'bankInfo.*.bank' => 'nullable|required_with:bankInfo.*.account,bankInfo.*.card,bankInfo.*.shaba|string',
            'bankInfo.*.account' => 'nullable|numeric',
            'bankInfo.*.card' => 'nullable|numeric',
            'bankInfo.*.shaba' => 'nullable|numeric',
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
