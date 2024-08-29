<?php

namespace Database\Factories;

use App\Models\CustomerType;
use App\Models\Driver;
use App\Models\Truck;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ConcreteSalesInvoice>
 */
class ConcreteSalesInvoiceFactory extends Factory
{
    protected const CONCRETE_ID = [1, 2, 3, 4, 5, 6, 7, 8];
    protected const CEMENT_STORE_ID = [1, 2];
    public $date= '1400-01-01';
    public function configure(): static
    {
        return $this->afterMaking(function () {
            // $this->date= '1400-01-02';
            // dump('zabi');
        })->afterCreating(function () {
            // dump('rahimi');
            $this->date= '1400-01-02';

        });
    }
    public function definition(): array
    {
        
        $customerIds =  CustomerType::where('code', 1)->limit(1200)->pluck('customer_id')->toArray(); 
        $customerId = $this->faker->randomElement($customerIds);

        $truckIds =  Truck::where('truckType', 'میکسر')->pluck('id')->toArray(); 
        $truckId = $this->faker->randomElement($truckIds);

        $driverIds =  Driver::pluck('id')->toArray(); 
        $driverId = $this->faker->randomElement($driverIds);

        $concreteId = $this->faker->randomElement(self::CONCRETE_ID);

        $cementStoreId = $this->faker->randomElement(self::CEMENT_STORE_ID);
        
        return [
            'customer_id' => $customerId,
            'truck_id' => $truckId,
            'driver_id' => $driverId,
            'concrete_id' => $concreteId,
            'cementStore_id' => $cementStoreId,
            'date' => $this->date(),
            // 'date' => $this->date,
            'time' => '09-08-25',
            'weight' => 16100,
            'cubicMeters' => 7,
            'unitPrice' => 1000000,
            'totalPrice' => 7000000,
            'fare' => 1200000,
            'maskanMeli' => '',
            'vahed' => '',
            'address' => 'ارسنجان خیابان طالفانی',
            'concretingPosition' => 'سقف',
             ];
    }

    public function date(){
        $repeatDate = mt_rand(3, 14);
        $resalt= $this->date;
        $this->date= '1400-01-02';
        return $resalt;
        // dd($repeatDate);
    }
}
