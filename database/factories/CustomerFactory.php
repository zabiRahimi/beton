<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $dates = [];

        // Carbon::createFromFormat('d-m-Y', '01-01-1401')->range(Carbon::createFromFormat('d-m-Y', '09-05-1403'))->each(function ($date) use (&$dates) {
        //     $dates[] = $date->format('Y-m-d');
        // });
        // // dd($dates);
        $names= ['اسماعیل', 'میکاییل', 'صلاح الدین', 'جلال', 'جمال', 'عزیز', 'نبی‌الله', 'عرشیا', 'پوریا', 'احسان', 'عباس', 'ابراهیم', 'امیر', 'محسن', 'احسان', 'فرزاد', 'صفا', 'حجت', 'یاسر', 'مهدی', 'مصطفی', 'مجتبی', 'مرتضی', 'ولی', 'باقر', 'سیروس', 'جلیل', 'خلیل', 'محمدحسن', 'حامد', 'سام', 'ابوذر', 'بهنام', 'اسکندر', 'کوروش', 'سجاد', 'صابر', 'صادق', 'رضا', 'ابوالفضل', '', 'سعید', 'مجید', 'جواد', 'ذوالفقار', 'عین‌الله',];
        $fathers= ['اصغر', 'جعفر', 'میرزا', 'شکرالله', 'اسدالله', 'قاسم', 'اسد', 'ناصر', 'فتحعلی', 'حاجی', 'حسن', 'غلام رضا', 'عبدالرضا', 'علی‌اکبر', 'یدالله', 'عسکر', 'اکبر', 'محمد‌علی', 'کریم', 'رحیم', 'درویش', 'داریوش', 'حاجی‌آقا', 'انوشیروان', 'فرود', 'ایرج', 'نادعلی', 'غلامعلی', 'بهرام', 'حاجی بابا', 'حسین', 'منوچهر', 'فرج', 'عبدالله'];
        return [
            'name' => fake()->randomElement($names),
            'lastName' => fake()->lastName(),
            'father' => fake()->randomElement($fathers),
            'nationalCode' => mt_rand(1000000000, 9999999999),
            // 'dateOfBirth' =>  fake()->randomElement($dates),
            // 'dateOfBirth' => '1401-03-15',
            'dateOfBirth' =>$this->faker->dateTimeBetween(
                Carbon::createFromDate(1401, 1, 1),
                Carbon::createFromDate(1403, 5, 9)
            )->format('Y-m-d'),
            'mobile' => '09' . mt_rand(100000000, 999999999),
            'telephone' => '0' . mt_rand(1000000000, 9999999999),
            'email' => fake()->unique()->safeEmail(),
            'postalCode' => mt_rand(1000000000, 9999999999),
            'address' => 'ارسنجان',
        ];
    }

    // $factory->afterCreating(Customer::class, function ($customer, $faker) {
    //     // مقدار دهی رابطه یک به چند با مدل CustomerType
    //     $customerType = CustomerType::where('code', 1)->where('type', 'خریدار')->first();
    //     if ($customerType) {
    //         $customer->customerTypes()->attach($customerType, ['subtype' => 'بتن']);
    //     }
    // });
}
