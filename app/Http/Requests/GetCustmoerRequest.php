<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetCustmoerRequest extends FormRequest
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
            'startDate'=> 'nullable|date',
            'endDate'=> 'nullable|date',
            'id'=> 'nullable|numeric',
            'types' => 'nullable | array',
            'types.*' => 'nullable|numeric',
            'name' => 'nullable|string',
            'lastName' => 'nullable|string',
        ];
    }
}
