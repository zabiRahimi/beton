<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
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
            'nationalCode' => 'nullable|bail|numeric|digits:10|unique:customers',
            'dateOfBirth' => 'nullable',
            'mobile' => 'nullable|bail|mobile|unique:customers',
            'telephone' => 'nullablebail|tel',
            'email' => 'nullable|bail|email:rfc,dns|unique:customers',
            'postalCode' => 'nullable|bail|numeric|digits:10',
            'address' => 'nullable|string',
        ];
    }
}
