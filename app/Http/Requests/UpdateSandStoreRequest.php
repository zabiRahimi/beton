<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateSandStoreRequest extends FormRequest
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
            'silo' => [
                'required', 'bail', 'string',
                Rule::unique('sand_stores')->ignore($this->sandStore)
            ],
            'amount' => ['required', 'bail', 'numeric'],
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
