<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWaterStoreRequest extends FormRequest
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
            'reservoir' => ['required', 'bail','string','unique:water_stores'],
            'amount' => ['required','bail','numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'reservoir.required' => 'نام مخزن را وارد کنید',
            'reservoir.unique' => 'نام مخزن تکراری است.',
        ];
    }
}
