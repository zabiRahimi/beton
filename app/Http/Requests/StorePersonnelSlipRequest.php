<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePersonnelSlipRequest extends FormRequest
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
            'customer_id' => ['required','bail','numeric','unique:personnel_slips'],
            'contractStart' => ['nullable','bail','date'],
            'contractPeriod' => ['nullable','bail','numeric',],
            'wageCalculation' => ['required','bail','string',],
            'salary' => ['required','bail','numeric',],
            'overtime' => ['nullable','bail','numeric',],
            'workFriday' => ['nullable','bail','numeric',],
            'workHoliday' => ['nullable','bail','numeric',],
            'absencePenalty' => ['nullable','bail','numeric',],
            'insurance' => ['nullable','bail','boolean',],
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'پرسنل را انتخاب کنید',
        ];
    }
}
