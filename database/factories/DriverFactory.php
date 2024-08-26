<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $names= ['عیسی', 'موسی', 'یحیی', 'عزالدین', 'کرامت', 'حمید', 'جواد', 'رضا', 'جلیل', 'عباس', 'ابراهیم', 'امیر', 'محسن', 'احسان', 'فرزاد', 'صفا', 'علی', 'محمد مهدی', 'مهدی', 'مصطفی', 'مجتبی', 'مرتضی', 'ولی', 'باقر', 'سیروس', 'خلیل', 'محمدحسن', 'حامد', 'سام', 'ابوذر', 'بهنام', 'اسکندر', 'کوروش', 'سجاد', 'صابر', 'صادق', 'رضا', 'ابوالفضل', 'سعید', 'مجید', 'جواد', 'ذوالفقار', 'عین‌الله',];
        $fathers= ['اصغر', 'جعفر', 'میرزا', 'شکرالله', 'اسدالله', 'قاسم', 'اسد', 'ناصر', 'فتحعلی', 'حاجی', 'حسن', 'غلام رضا', 'عبدالرضا', 'علی‌اکبر', 'یدالله', 'عسکر', 'اکبر', 'محمد‌علی', 'کریم', 'رحیم', 'درویش', 'داریوش', 'حاجی‌آقا', 'انوشیروان', 'فرود', 'ایرج', 'نادعلی', 'غلامعلی', 'بهرام', 'حاجی بابا', 'حسین', 'منوچهر', 'فرج', 'عبدالله'];

        $address = ['ارسنجان خیابان طالقانی','ارسنجان بلوار دانشگاه','ارسنجان فلکه انار','ارسنجان تل سرخ خیابان قائم','ارسنجان علی آباد','ارسنجان روستای قلات جیرو','مرودشت خیابان ژیان','ارسنجان دهستان خبریز','شیراز بلوار صنایع','سعادت شهر میدان دادگستری'];
        return [
            'name' => fake()->randomElement($names),
            'lastName' => fake()->lastName(),
            'father' => fake()->randomElement($fathers),
            'nationalCode' => mt_rand(1000000000, 9999999999),
            'dateOfBirth' =>$this->faker->dateTimeBetween(
                Carbon::createFromDate(1345, 1, 1),
                Carbon::createFromDate(1375, 5, 9)
            )->format('Y-m-d'),
            'mobile' => '09' . mt_rand(100000000, 999999999),
            'address' => fake()->randomElement($address),
        ];
    }
}
