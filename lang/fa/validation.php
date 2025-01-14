<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => 'The :attribute must be accepted.',
    'active_url'           => 'The :attribute is not a valid URL.',
    'after'                => 'The :attribute must be a date after :date.',
    'after_or_equal'       => 'The :attribute must be a date after or equal to :date.',
    'alpha'                => 'The :attribute may only contain letters.',
    'alpha_dash'           => ' :attribute فقط باید حاوی حروف، اعداد و خط فاصله باشد',
    'alpha_num'            => 'The :attribute may only contain letters and numbers.',
    'array'                => 'The :attribute must be an array.',
    'before'               => 'The :attribute must be a date before :date.',
    'before_or_equal'      => 'The :attribute must be a date before or equal to :date.',
    'between'              => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file'    => 'The :attribute must be between :min and :max kilobytes.',
        'string'  => 'The :attribute must be between :min and :max characters.',
        'array'   => 'The :attribute must have between :min and :max items.',
    ],
    'captcha'              => 'کد امنیتی را صحیح وارد کنید',
    'mobile'               => 'موبایل را صحیح وارد کنید .',
    'codemly'              => 'کد ملی ده رقمی را صحیح وارد کنید .',
    'tel'                  => 'تلفن را صحیح وارد کنید . وارد کردن کد استان الزامی است.',
    'address'              => 'آدرس را صحیح و به فارسی وارد کنید .',
    'codepost'             => 'کد پستی را صحیح وارد کنید .',
    'pass'                 => ':attribute فقط شامل حروف انگلیسی ، اعداد ، "-" و "_"باید باشد .',
    'name'                 => ':attribute صحیح و به فارسی وارد کنید',
    'farsi'                => ':attribute صحیح و به فارسی وارد کنید',
    'numberplate'          => 'شماره پلاک را صحیح وارد کنید.',
    'boolean'              => 'The :attribute field must be true or false.',
    'confirmed'            => 'The :attribute confirmation does not match.',
    'date'                 => ' :attribute را صحیح وارد کنید',
    'date_format'          => 'The :attribute does not match the format :format.',
    'different'            => 'The :attribute and :other must be different.',
    'digits'               => ':attribute باید :digits رقم باشد.',
    'digits_between'       => 'The :attribute must be between :min and :max digits.',
    'dimensions'           => 'The :attribute has invalid image dimensions.',
    'distinct'             => 'The :attribute field has a duplicate value.',
    'email'                => ' ایمیل را صحیح وارد کنید',
    'exists'               => 'The selected :attribute is invalid.',
    'file'                 => 'The :attribute must be a file.',
    'filled'               => 'The :attribute field must have a value.',
    'time'               => 'ساعت را صحیح وارد کنید.',
    'gt'                   => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file'    => 'The :attribute must be greater than :value kilobytes.',
        'string'  => 'The :attribute must be greater than :value characters.',
        'array'   => 'The :attribute must have more than :value items.',
    ],
    'gte'                  => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file'    => 'The :attribute must be greater than or equal :value kilobytes.',
        'string'  => 'The :attribute must be greater than or equal :value characters.',
        'array'   => 'The :attribute must have :value items or more.',
    ],
    'image'                => 'The :attribute must be an image.',
    'in'                   => 'The selected :attribute is invalid.',
    'in_array'             => 'The :attribute field does not exist in :other.',
    'integer'              => 'The :attribute must be an integer.',
    'ip'                   => 'The :attribute must be a valid IP address.',
    'ipv4'                 => 'The :attribute must be a valid IPv4 address.',
    'ipv6'                 => 'The :attribute must be a valid IPv6 address.',
    'json'                 => 'The :attribute must be a valid JSON string.',
    'lt'                   => [
        'numeric' => 'The :attribute must be less than :value.',
        'file'    => 'The :attribute must be less than :value kilobytes.',
        'string'  => 'The :attribute must be less than :value characters.',
        'array'   => 'The :attribute must have less than :value items.',
    ],
    'lte'                  => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file'    => 'The :attribute must be less than or equal :value kilobytes.',
        'string'  => 'The :attribute must be less than or equal :value characters.',
        'array'   => 'The :attribute must not have more than :value items.',
    ],
    'max'                  => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file'    => 'The :attribute may not be greater than :max kilobytes.',
        'string'  => 'The :attribute may not be greater than :max characters.',
        'array'   => 'The :attribute may not have more than :max items.',
    ],
    'mimes'                => 'The :attribute must be a file of type: :values.',
    'mimetypes'            => 'The :attribute must be a file of type: :values.',
    'min'                  => [
        'numeric' => ':attribute نباید کمتر از :min عدد باشد .',
        'file'    => 'The :attribute must be at least :min kilobytes.',
        'string'  => ':attribute نباید کمتر از :min حرف باشد .',
        'array'   => 'The :attribute must have at least :min items.',
    ],
    'not_in'               => 'The selected :attribute is invalid.',
    'not_regex'            => 'The :attribute format is invalid.',
    'numeric'              => ' :attribute را به عدد وارد کنید',
    'present'              => 'The :attribute field must be present.',
    'regex'                => 'The :attribute format is invalid.',

    'required'             => ' :attribute را وارد کنید',
    'required_if'          => 'The :attribute field is required when :other is :value.',
    'required_unless'      => 'The :attribute field is required unless :other is in :values.',
    'required_with'        => 'The :attribute field is required when :values is present.',
    'required_with_all'    => 'The :attribute field is required when :values is present.',
    'required_without'     => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same'                 => 'The :attribute and :other must match.',
    'size'                 => [
        'numeric' => 'The :attribute must be :size.',
        'file'    => 'The :attribute must be :size kilobytes.',
        'string'  => 'The :attribute must be :size characters.',
        'array'   => 'The :attribute must contain :size items.',
    ],
    'string'               => 'The :attribute must be a string.',
    'timezone'             => 'The :attribute must be a valid zone.',
    'unique'               => ':attribute تکراری می باشد .',
    'uploaded'             => 'The :attribute failed to upload.',
    'url'                  => 'The :attribute format is invalid.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
        'captcha' => [
            'required_unless' => ' کد امنیتی را وارد کنید .',
        ],

        'bankInfo.*.bank' => [
            'required_with' => 'لازم است نام بانک را نیز انتخاب کنید',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [
        'name_karbary' => 'نام کاربری',
        'userName' => 'نام کاربری',
        'karbary' => 'نام کاربری',
        'name' => 'نام',
        'buyer' =>'خریدار',
        'lastName' => 'نام خانوادگی',
        'shop' => 'نام فروشگاه',
        'namePro' => 'نام محصول',
        'pass' => 'رمز عبور',
        'pasOld' => 'رمز عبور فعلی',
        'pasNew' => 'رمز عبور جدید',
        'mobile' => 'موبایل',
        'email' => 'ایمیل',
        'nationalCode' => 'کد ملی',
        'postalCode' => 'کد پستی',
        'tel' => 'تلفن',
        'address' => 'آدرس',
        'city' => 'شهر',
        'state' => 'استان',
        'accountNumber' => 'شماره حساب بانک',
        'cartNumber' => 'شماره کارت عابر بانک',
        'accountOwner' => 'نام صاحب حساب',
        'bank' => 'نام بانک',
        'shabaNumber' => 'شماره شبا',
        'captcha' => 'کد امنیتی',
        'shekait' => 'متن انتقاد یا شکایت',
        'vahedPro' => 'واحد شمارش کالا',
        'numPro' => 'تعداد خرید',
        'stamp' => 'نوع محصول',
        'price' => 'قیمت محصول',
        'priceFOrder' => 'قیمت برای این سفارش',
        'vahed' => 'واحد شمارش کالا',
        'vazn' => 'وزن محصول',
        'vaznPost' => 'وزن پستی',
        'pakat' => 'هزینه بسته بندی',
        'codePro' => 'کد محصول',
        'codeRahgiry' => 'کد رهگیری پستی',
        'dimension' => 'ابعاد محصول',
        'question' => 'پرسش',
        'answer' => 'پاسخ',
        'nazar' => 'نظر',
        'code' => 'کد',
        'link' => 'لینک',
        'book' => 'کتاب',
        'bookLink' => 'لینک کتاب',
        'lesson' => 'فصل',
        'lessonLink' => 'لینک فصل',
        'lesson_section' => 'تیتر بخش',
        'lessonSection' => 'تیتر بخش',
        'word' => 'کلمه',
        'wordLink' => 'لینک کلمه',
        'sentence' => 'جمله',
        'sentenceLink' => 'لینک جمله',
        'des' => 'متن',
        'types.*.type' => 'نوع مشتری',
        'father' => 'نام پدر',
        'bankInfo.*.bank' => 'نام بانک ',
        'bankInfo.*.account' => ' شماره حساب',
        'bankInfo.*.card' => ' شماره کارت',
        'bankInfo.*.shaba' => ' شماره شبا',
        'dateOfBirth' => 'تاریخ تولد',
        'telephone' => 'تلفن',
        'concreteName' => 'نام بتن',
        'amountCement' => 'مقدار سیمان',
        'amountSand' => 'مقدار ماسه',
        'amountGravel' => 'مقدار شن(بادامی)',
        'amountWater' => 'مقدار آب',
        'unit' => 'واحد',
        'numberplate' => 'شماره پلاک',
        'truckName' => 'نام خودرو',
        'truckType' => 'نوع خودرو',
        'ownerName' => 'نام مالک خودرو',
        'ownerLastName' => 'نام خانوادگی مالک خودرو',
        'contractStart' => 'شروع قرارداد',
        'contractPeriod' => 'مدت قرارداد',
        'wageCalculation' => 'نوع دستمزد',
        'salary' => 'میزان حقوق',
        'workFriday' => 'درصد جمعه‌کاری',
        'overtime' => 'درصد اضافه‌کاری',
        'insurance' => 'بیمه',
        'absencePenalty' => 'جریمه غیبت',
        'silo' => 'سیلو',
        'amount' => 'مقدار',
        'reservoir' => 'مخزن',
        'job' => 'شغل',
        'weight'=>'وزن',
        'cementStore_id'=>'سیلوی سیمان',
        'cubicMeters'=>'مترمکعب',
        'unitPrice'=>'قیمت واحد',
        'totalPrice'=>'قیمت کل',
        'unitFare' => 'کرایه هر تن',
        'totalFare' => 'کل کرایه',
        'vahed'=>'واحد',
        'typeSand'=>'نوع شن‌وماسه',
        'sandSeller_id'=>'کارخانه',
        'dumpTruckOwner_id'=>'شماره پلاک و مالک خودرو',
        'sandStore_id'=>'سیلو شن‌وماسه',
        'referenceNumber'=>'شماره حواله',
        'billNumber'=>'شماره قبض',
        'description'=>'توضیحات',
        'concretingPosition'=>'موقعیت بتن ریزی',
        'time'=>'ساعت',
        'date'=>'تاریخ',
        'invoice.*.time'=>'ساعت',
        'invoice.*.date'=>'تاریخ',
        'invoice.*.concrete_id'=>'عیار بتن',
        'invoice.*.cementStore_id'=>'سیلوی سیمان',
        'invoice.*.unitPrice'=>'قیمت واحد بتن',
        'invoice.*.weight'=>'وزن خالص بار',
        'invoice.*.truck_id'=>'میکسر',
        'invoice.*.driver_id'=>'راننده',
        'invoice.*.fare'=>'کرایه میکسر',
        'invoice.*.vahed'=>'شماره واحد',
        'invoice.*.concretingPosition'=>'موقعیت بتن ریزی',
    ],

];
