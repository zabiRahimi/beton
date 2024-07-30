<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
        return [
            'name'=> fake()->name(),
            'lastName'=> fake()->lastName(),
            'father'=> fake()->name(),
            'nationalCode'=> mt_rand(1000000000, 9999999999),
            'dateOfBirth'=>fake()->date('Y-m-d', rand(14010101, 14030509)),
            'mobile'=>'09' . mt_rand(100000000, 999999999),
            'telephone'=>'0' . mt_rand(1000000000, 9999999999),
            'email'=>fake()->unique()->safeEmail(),
            'postalCode'=>mt_rand(1000000000, 9999999999),
            'address'=>'ارسنجان',
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
