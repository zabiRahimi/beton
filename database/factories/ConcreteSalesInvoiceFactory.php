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

    protected const TIME = ['06-08-00', '06-15-00', '06-20-00', '06-30-00', '06-50-00', '07-01-00', '07-10-00', '07-16-00', '07-58-00', '08-12-00', '08-17-00', '08-34-00', '08-49-00', '09-01-00', '09-11-00', '09-21-00', '10-30-00', '10-51-00', '11-14-00', '11-26-00', '11-34-00', '11-42-00', '12-25-00', '12-38-00', '12-49-00', '13-21-00', '13-35-00', '13-42-00', '14-23-00', '14-36-00', '15-02-00', '15-47-00', '16-12-00', '16-29-00', '17-32-00', '17-46-00', '17-59-00', '18-21-00', '18-37-00', '19-12-00', '19-28-00', '19-41-00', '20-25-00', '20-37-00', '20-50-00'];

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
        // $time = $this->faker->randomElement(self::TIME);

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
            // $this->time['minutes'] = $this->date['day'];
            $this->time['minutes'] = $this->date['day'];
        }

        

        if ($this->repeatDate == 1) {
            $this->date['day']++;
            
            // $this->time['minutes'] = $this->date['day'];
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
