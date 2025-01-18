<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReceiptRequest extends FormRequest
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
            'customer_id' => ['required', 'exists:customers,id'],
            'date' => ['required', 'date'],
            'price' => ['required', 'bail', 'numeric', 'digits_between:1,12'],
            'for' => ['required', 'string'],
            'how_to_pay' => ['required', 'string'],
            'document_receivable_id' => ['required_if:isDocument,true,1', 'exists:documentReceivables,id'],

            'sand_remittance_id' => ['required_if:how_to_pay,', 'exists:sand_remittances,id'],
            'sand_remittance_id' => ['nullable', 'exists:sand_remittances,id'],
            'sand_remittance_id' => ['nullable', 'exists:sand_remittances,id'],
            'buyer' => ['required', 'string'],
            'nationalCode' => ['nullable', 'bail','numeric','digits:10'],
            'address' => ['required', 'string'],
            'tel' => ['nullable', 'numeric'],
            'products' => ['required', 'array'],
            // 
            // 
            // 
            // 
            // 
            // how_to_pay
            // sand_remittance_id
            // cement_remittance_id
            // isDocument
            // isSandRemittance
            // isCementRemittance
            // number
            // bank
            // bank_branch
            // date_check
            // owner
            // description
        ];
    }
}
