<?php

namespace Database\Factories;

use App\Models\CustomerType;
use App\Models\Driver;
use App\Models\Truck;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ConcreteSalesInvoice>
 */
class ConcreteSalesInvoiceFactory extends Factory
{
    protected  $date = ['year' => 1400, 'month' => 1, 'day' => 1];
    protected $time = ['hour' => 7, 'minutes' => 00, 'seconds' => 00];
    protected $repeatDate = 3;
    protected const CONCRETE_ID = [1, 2, 3, 4, 5, 6, 7, 8];
    protected const CEMENT_STORE_ID = [1, 2];

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
            'time' => $this->time(),
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

    public function date()
    {
        $resalt = Carbon::create($this->date['year'], $this->date['month'], $this->date['day']);
        $this->repeatDate--;
        $this->time['minutes'] = $this->time['minutes'] + 10;
        if ($this->time['minutes'] > 58) {
            $this->time['hour']++;
            $this->time['minutes'] = $this->date['day'];
        }

        if ($this->repeatDate == 1) {
            $this->date['day']++;
            if ($this->date['day'] == 30 && $this->date['month'] == 12) {
                $this->date['year']++;
                $this->date['month'] = 1;
                $this->date['day'] = 1;
            } elseif ($this->date['day'] == 30) {
                $this->date['month']++;
                $this->date['day'] = 1;
            }
            $this->repeatDate = mt_rand(3,8);
            
            if ($this->time['hour']>=18) {
                $this->time['hour'] =7;
            }

        }
        $resalt = $resalt->format('Y-m-d');
        return $resalt;
    }

    public function time()
    {
        $resalt = sprintf('%02d-%02d-%02d', $this->time['hour'], $this->time['minutes'], $this->time['seconds']);
        return $resalt;
    }
}
