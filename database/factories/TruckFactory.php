<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Truck>
 */
class TruckFactory extends Factory
{
    protected const TRUCK_NAMES = ['بنز', 'ولو', 'داف', 'اویکو', 'ماک', 'اف', 'اسکانیا', 'آمیکو', 'دانگ‌‌‌‌‌‌‌ فانگ', 'کاویان'];
    protected const TRUCK_TYPES = ['میکسر', 'کمپرسی'];

    private function getValidCustomerTypesForTruckType(string $truckType): array
    {
        $customerTypeMapping = [
            5 => 'مالک میکسر',
            8 => 'مالک کمپرسی',
            // ...
        ];

        $validCustomerTypesCodes = [
            'میکسر' => [5],
            'کمپرسی' => [8],
            // ...
        ];

        $validCustomerTypesNames = [];
        foreach ($validCustomerTypesCodes[$truckType] as $code) {
            $validCustomerTypesNames[] = $customerTypeMapping[$code];
        }

        return $validCustomerTypesNames;
    }

    public function definition(): array
    {
        $truckType = $this->faker->randomElement(self::TRUCK_TYPES);
        $validCustomerTypes = $this->getValidCustomerTypesForTruckType($truckType);
        $customerType = $this->faker->randomElement($validCustomerTypes);

        // $customer = null;
        // while (!$customer) {
        //     $customer = Customer::whereHas('customerType', function ($query) use ($customerType) {
        //         $query->where('code', $customerType);
        //     })->inRandomOrder()->first();
        // }

        // return [
        //     'customer_id' => $customer->id,
        //     'truckName' => $this->faker->randomElement(self::TRUCK_NAMES),
        //     'truckType' => $truckType,
        //     'numberplate' => substr(Str::uuid()->hyphenated, 0, 8) . '-' . $this->faker->randomElement(['الف', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی']),
        // ];
        $customer = Customer::whereHas('customerType', function ($query) use ($customerType) {
            $query->where('code', $customerType);
        })->inRandomOrder()->first();
        
        if (!$customer) {
            throw new \Exception("No customer found with the specified type.");
        }
        
        return [
            'customer_id' => $customer->id,
            'truckName' => $this->faker->randomElement(self::TRUCK_NAMES),
            'truckType' => $truckType,
            'numberplate' => substr(Str::uuid()->toString(), 0, 8) . '-' . $this->faker->randomElement(['الف', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی']),
        ];
    }
}
