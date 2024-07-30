<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerType>
 */
class CustomerTypeFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $code = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        return [
            'code' => Arr::random($code),
            'type' => function (array $attributes) {
                // تعیین مقدار type بر اساس code
                
                switch ($attributes['code']) {
                    case 1:
                        $type = 'خریدار';
                        break;
                    case 2:
                        $type = 'فروشنده';
                        break;
                    case 3:
                        $type = 'فروشنده';
                        break;
                    case 4:
                        $type = 'فروشنده';
                        break;
                    case 5:
                        $type = 'مالک';
                        break;
                    case 6:
                        $type = 'مالک';
                        break;
                    case 7:
                        $type = 'مالک';
                        break;
                    case 8:
                        $type = 'مالک';
                        break;
                    case 9:
                        $type = 'پرسنل';
                        break;
                }
                return $type;
            },
            'subtype' => function (array $attributes) {
                switch ($attributes['code']) {
                    case 1:
                        $suptype = 'بتن';
                        break;
                    case 2:
                        $suptype = 'شن و ماسه';
                        break;
                    case 3:
                        $suptype = 'سیمان';
                        break;
                    case 4:
                        $suptype = 'آب';
                        break;
                    case 5:
                        $suptype = 'میکسر';
                        break;
                    case 6:
                        $suptype = 'پمپ دکل';
                        break;
                    case 7:
                        $suptype = 'پمپ زمینی';
                        break;
                    case 8:
                        $suptype = 'کمپرسی';
                        break;
                    case 9:
                        $suptype = null;
                        break;
                }
                return $suptype;
            },
        ];
    }
}
