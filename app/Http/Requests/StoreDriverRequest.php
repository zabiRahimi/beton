<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDriverRequest extends FormRequest
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
            'name' => ['required', 'bail','string'],
            'lastName' => ['required','bail','numeric'],
            'nationalCode' => ['required','bail','numeric','unique:drivers'],
            'dateOfBirth' => ['required','bail','numeric'],
            'mobile' => ['required','bail','string','unique:drivers'],
            'address' => ['nullable','bail','numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'نام راننده را وارد کنید',
            'lastName.required' => 'نام خانوادگی راننده را وارد کنید',
        ];
    }
}
