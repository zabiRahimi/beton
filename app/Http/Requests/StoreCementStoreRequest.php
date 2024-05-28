<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCementStoreRequest extends FormRequest
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
            'silo' => ['required', 'bail','string','unique:cement_stores'],
            'amount' => ['required','bail','numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'silo.required' => 'نام سیلو را وارد کنید',
            'silo.unique' => 'نام سیلو تکراری است.',
        ];
    }
}
