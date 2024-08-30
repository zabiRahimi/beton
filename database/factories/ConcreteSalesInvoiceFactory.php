<?php

namespace Database\Factories;

use App\Models\ConcreteSalesInvoice;
use App\Models\CustomerType;
use App\Models\Driver;
use App\Models\Financial;
use App\Models\Truck;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ConcreteSalesInvoice>
 */
class ConcreteSalesInvoiceFactory extends Factory
{
    protected $model = ConcreteSalesInvoice::class;
    
    protected  $date = ['year' => 1400, 'month' => 1, 'day' => 1];
    protected $time = ['hour' => 7, 'minutes' => 00, 'seconds' => 00];
    protected $repeatDate = 3;
    protected const CONCRETE_ID = [1, 2, 3, 4, 5, 6, 7, 8];
    protected const CEMENT_STORE_ID = [1, 2];
    protected const MASKAN_MLIE = ['مسکن ملی شهرک امام خمینی','مسکن ملی شهرک شهید رییسی',''];
    protected const ADDRESS = ['ارسنجان خیابان طالقانی','ارسنجان بلوار دانشگاه','ارسنجان فلکه انار','ارسنجان تل سرخ خیابان قائم','ارسنجان حسین آباد','ارسنجان روستای قلات جیرو','علی آباد ملک','ارسنجان دهستان خبریز','جمال آباد','سعادت شهر میدان دادگستری','سعادت شهر مسکن ملی'];
    protected const POSITION = ['چوب برق','کف ریزی','فنداسیون','ستون','سقف','شالوده','کف سازی'];


    public function configure()
    {
        return $this->afterCreating(function (ConcreteSalesInvoice $invoice) {
            $truck=Truck::find($invoice->truck_id);
            $buyer_financial = Financial::firstOrNew(['customer_id' => $invoice->customer_id]);

            $ownderMixer_financial = Financial::firstOrNew(['customer_id' => $truck->customer_id]);
            $ownderMixer_financial->creditor+= $invoice->fare; 

            if ($invoice->customer->type == 'نوع_خاص_مشتری') {
                $financial->amount += $invoice->amount; // اضافه کردن مقدار
            } else {
                $financial->amount -= $invoice->amount; // کم کردن مقدار
            }

            $financial->save();
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
        $wieght = mt_rand(11200, 17000);
        $cubicMeters = $wieght / 2300;
        if (is_float($cubicMeters)) {
            $cubicMeters = round($cubicMeters, 2);
        }
        $unitPrice='';
        switch ($concreteId) {
            case 1:
                $unitPrice = mt_rand(900000,1250000);
                break;
            case 2:
                $unitPrice = mt_rand(1250000,1380000);
                break;
            case 3:
                $unitPrice = mt_rand(1380000,1450000);
                break;
            case 4:
                $unitPrice = mt_rand(1450000,1560000);
                break;
            case 5:
                $unitPrice = mt_rand(1560000,1620000);
                break;
            case 6:
                $unitPrice = mt_rand(1620000,1740000);
                break;
            case 7:
                $unitPrice = mt_rand(1740000,1850000);
                break;
            case 8:
                $unitPrice = mt_rand(1850000,2000000);
                break;
        }

        $totalPrice=$cubicMeters*$unitPrice;
        if (is_float($totalPrice)) {
            $totalPrice = round($totalPrice);
        }
        $fare=mt_rand(900000,2100000);

        $address=$this->faker->randomElement(self::ADDRESS);

        $maskanMeli=$this->faker->randomElement(self::MASKAN_MLIE);
        $vahed='';
        if ($maskanMeli !='') {
            $vahed=mt_rand(1,3000);
            $address='ارسنجان';
        }

        $position= $this->faker->randomElement(self::POSITION);
        
        return [
            'customer_id' => $customerId,
            'truck_id' => $truckId,
            'driver_id' => $driverId,
            'concrete_id' => $concreteId,
            'cementStore_id' => $cementStoreId,
            'date' => $this->date(),
            'time' => $this->time(),
            'weight' => $wieght,
            'cubicMeters' => $cubicMeters,
            'unitPrice' => $unitPrice,
            'totalPrice' => $totalPrice,
            'fare' => $fare,
            'maskanMeli' => $maskanMeli,
            'vahed' =>$vahed,
            'address' => $address,
            'concretingPosition' =>  $position,
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
            $this->repeatDate = mt_rand(3, 8);

            if ($this->time['hour'] >= 18) {
                $this->time['hour'] = 7;
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
