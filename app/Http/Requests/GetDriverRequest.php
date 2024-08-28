<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetDriverRequest extends FormRequest
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
            'id'=> 'nullable|numeric',
            'name' => 'nullable|string',
            'lastName' => 'nullable|string'
        ];
    }

    public function messages(): array
    {
        return [
            'id.numeric' => 'شناسه را به عدد وارد کنید',
            'name.string' => 'نام راننده را صحیح وارد کنید',
            'lastName.string' => 'نام خانوادگی راننده را صحیح وارد کنید',
        ];
    }
}
