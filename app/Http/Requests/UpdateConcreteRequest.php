<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateConcreteRequest extends FormRequest
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
            'concreteName' => ['required', 'bail','string', Rule::unique('concretes')->ignore($this->concretes)],
            'amountCement' => ['required','bail','numeric'],
            'amountSand' => ['required','bail','numeric'],
            'amountGravel' => ['required','bail','numeric'],
            'amountWater' => ['required','bail','numeric'],
            'unit' => ['nullable','required_with:unitPrice','bail','string'],
            'unitPrice' => ['nullable','bail','numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'unit.required_with' => 'هنگامی که قیمت واحد را وارد می‌کنید، لازم است واحد را نیز انتخاب کنید.',
            
        ];
    }
}
