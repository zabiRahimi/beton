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
            'contractStart' => ['nullable','bail',],
            'contractPeriod' => ['nullable','bail',],
            'wageCalculation' => ['required','bail',],
            'salary' => ['required','bail',],
            'workFriday' => ['nullable','bail',],
            'workHoliday' => ['nullable','bail',],
            'overtime' => ['nullable','bail',],
            'insurance' => ['nullable','bail',],
            'absencePenalty' => ['nullable','bail',],
        ];
    }
}
