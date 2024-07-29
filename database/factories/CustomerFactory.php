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
            'nationalCode'=> Str::random(10),
            'dateOfBirth'=>,
            'mobile'=>,
            'telephone'=>,
            'email'=>fake()->unique()->safeEmail(),
            'postalCode'=>,
            'address'=>,
        ];
    }
}
