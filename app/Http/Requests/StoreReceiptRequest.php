<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;


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
        Log::info('ورودی‌های فرم:', $this->all());
        return [
            'customer_id' => ['required', 'exists:customers,id'],
            'date' => ['required', 'date'],
            'price' => ['required', 'bail', 'numeric', 'digits_between:1,12'],
            'for' => ['required', 'string'],
            'how_to_pay' => ['required', 'string'],

            // 'isDocument' => ['nullable', 'boolean'],
            // 'document_receivable_id' => [''nullable',required_if_accepted:isDocument', 'exists:document_receivables,id'],

            'isSandRemittance' => ['nullable', 'boolean'],
            'sand_remittance_id' => ['nullable','required_if_accepted:isSandRemittance',   'exists:sand_remittances,id'],

            // 'isCementRemittance' => ['nullable', 'boolean'],
            // 'cement_remittance_id' => [''nullable',required_if_accepted:isCementRemittance', 'exists:cement_remittances,id'],

            'date_check' => ['nullable', 'date'],
            'number' => ['nullable', 'bail', 'numeric', 'digits:16'],
            'owner' => ['nullable', 'string'],
            'bank' => ['nullable', 'string'],
            'bank_branck' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],

        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'مشتری(پرداخت کننده) را انتخاب کنید',
            'customer_id.exists' => 'مشتری(پرداخت کننده) را به صورت صحیح انتخاب کنید',
            'date.required' => 'تاریخ را وارد کنید',
            'date.date' => 'تاریخ را صحیح وارد کنید',
            'price.required' => 'مبلغ را وارد کنید',
            'price.numeric' => 'مبلغ را به صورت عددی وارد کنید',
            'price.digits_between' => 'مبلغ پرداختی منطقی نیست، مبلغ را صحیح وارد کنید',
            'for.required' => 'بابت پرداخت را وارد کنید',
            'how_to_pay.required' => 'نحوه پرداخت را انتخاب کنید',
            'document_receivable_id.required_if_accepted' => 'چک را انتخاب کنید',
            'sand_remittance_id.required_if_accepted' => 'حواله شن و ماسه را انتخاب کنید',
            'cement_remittance_id.required_if_accepted' => 'حواله سیمان را انتخاب کنید',
            'date_check.required' => 'تاریخ را وارد کنید',
            'date_check.date' => 'تاریخ را صحیح وارد کنید',
            'number.numeric' => 'شماره را به عدد وارد کنید',
            'number.digits' => 'شماره 16 رقم است، صحیح وارد کنید',
        ];
    }



    protected function failedValidation(Validator $validator)
    {
        // لاگ کردن خطاهای اعتبارسنجی
        Log::error('اعتبارسنجی شکست خورد:', [
            'errors' => $validator->errors(),
            'inputs' => $this->input(),
        ]);

        throw new ValidationException($validator);
    }
}
