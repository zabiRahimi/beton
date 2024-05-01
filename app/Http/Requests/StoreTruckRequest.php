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
            'truckName' => ['nullable', 'bail','string'],
            'truckType' => ['required','bail','string'],
            'plaque' => ['required','bail','unique:trucks'],
            'owner' => ['required','bail','string'],
        ];
    }
}
