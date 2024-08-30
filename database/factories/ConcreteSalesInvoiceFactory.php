<?php

namespace Database\Factories;

use App\Models\CementStore;
use App\Models\Concrete;
use App\Models\ConcreteSalesInvoice;
use App\Models\CustomerType;
use App\Models\Driver;
use App\Models\Financial;
use App\Models\SandStore;
use App\Models\Truck;
use App\Models\WaterStore;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

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
            
            $this->customerDebt($invoice->customer_id, $invoice->totalPrice);

            $mixerOwnerId=$this->getMiserOwnerId($invoice->truck_id);

            $this->mixerOwnerSalary($mixerOwnerId, $invoice->fare);


            $this->cementDeduction($invoice->cementStore_id, $invoice->concrete_id, $invoice->cubicMeters);

            $this->sandDeduction($invoice->concrete_id, $invoice->cubicMeters);
            $this->waterDeduction($invoice->concrete_id, $invoice->cubicMeters);
            
        });
    }

    /**
     * مبلغ بتن را به بدهی مشتری اضافه می کند
     */
    private function customerDebt(int $customerId, int $totalPrice)
    {
        Financial::updateOrCreate(
            ['customer_id' => $customerId],
            ['debtor' => DB::raw('debtor + ' . $totalPrice)]
        );
    }

    private function getMiserOwnerId($truck_id) : int {
        $truck=Truck::find($truck_id);
        return $truck->customer_id;
    }

    /**
     * کرایه میکسر را به حساب مالک اضافه می کند
     */
    private function mixerOwnerSalary(int $ownerId, int $fare)
    {
        Financial::updateOrCreate(
            ['customer_id' => $ownerId],
            ['creditor' => DB::raw('creditor + ' . $fare)]
        );
    }

     /**
     * مقدار سیمان مصرف شده را از سیلو مورد نظر کم می کند
     */
    private function cementDeduction(int $cementStoreId, int $concreteId, int|float $cubicMeters)
    {
        $amountCement = $this->returnsCementUsed($concreteId, $cubicMeters);
        $cementStore = CementStore::find($cementStoreId);
        $cementStore->amount -= $amountCement;
        $cementStore->save();
    }

      /**
     * محاسبه کل سیمان مصرف شده در بار
     */
    private function returnsCementUsed(int $concreteId, int|float $cubicMeters)
    {
        $unitAmountCement = $this->returnUnitAmountCement($concreteId);
        $amountCement = $unitAmountCement * $cubicMeters;
        return $amountCement;
    }

     /**
     * مقدار مصرفی سیمان در هر متر بتن بسته به نوع بتن را برمی‌گرداند
     */
    private function returnUnitAmountCement(int $concreteId)
    {
        $concrete = Concrete::find($concreteId);
        $unitAmountCement = $concrete->amountCement;
        return $unitAmountCement;
    }

    /**
     * مقدار شن و ماسه مصرف شده را کم می کند
     */
    private function sandDeduction(int $concreteId, int|float $cubicMeters)
    {
        $amountSand = $this->returnsSandUsed($concreteId, $cubicMeters);
        $sandStore = SandStore::find(1);
        $sandStore->amount -= $amountSand;
        $sandStore->save();
    }

    /**
     * محاسبه کل شن و ماسه مصرف شده در بار
     */
    private function returnsSandUsed(int $concreteId, int|float $cubicMeters)
    {
        $unitAmountSand = $this->returnUnitAmountSand($concreteId);
        $amountSand = $unitAmountSand * $cubicMeters;
        return $amountSand;
    }

    /**
     * مجموع مقدار شن و ماسه مصرفی در هر متر بتن
     */
    private function returnUnitAmountSand(int $concreteId)
    {
        $concrete = Concrete::find($concreteId);
        $unitAmountSand = $concrete->amountSand;
        $unitAmountGravel = $concrete->amountGravel;
        $totalUnitSand = $unitAmountSand + $unitAmountGravel;
        return $totalUnitSand;
    }

    /**
     * مقدار مصرف شده آب در یک بار کامیون را از مخزن کم می کند
     */
    private function waterDeduction(int $concreteId, int|float $cubicMeters)
    {
        $amountWater = $this->returnsWaterUsed($concreteId, $cubicMeters);
        $waterStore = WaterStore::find(1);
        $waterStore->amount -= $amountWater;
        $waterStore->save();
    }

    
    /**
     * محاسبه کل آب مصرف شده در بار
     */
    private function returnsWaterUsed(int $concreteId, int|float $cubicMeters)
    {
        $unitAmountWater = $this->returnUnitAmountWater($concreteId);
        $amountWater = $unitAmountWater * $cubicMeters;
        return $amountWater;
    }

    /**
     * مقدار مصرف آب در هر متر بتن
     */
    private function returnUnitAmountWater(int $concreteId)
    {
        $concrete = Concrete::find($concreteId);
        $unitAmountWater = $concrete->amountWater;
        return $unitAmountWater;
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
