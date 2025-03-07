<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;
 use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use App\Http\Requests\GetSandInvoiceRequest;
use App\Models\SandInvoice;
use App\Http\Requests\StoreSandInvoiceRequest;
use App\Http\Requests\UpdateSandInvoiceRequest;
use App\Models\Customer;
use App\Models\CustomerType;
use App\Models\Driver;
use App\Models\Financial;
use App\Models\SandRemittance;
use App\Models\SandStore;
use App\Models\Truck;

class SandInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetSandInvoiceRequest $request)
    {
        $query = SandInvoice::query();
        $querySandRemittance = SandRemittance::query();
        $queryDumpTruck = Truck::query();
        $queryDumpTruckOwner = Customer::whereHas('customerType', function ($query) {
            $query->where('code', 8);
        });

        $queryDriver = Driver::query();
        if ($request->filled('id')) {
            $query->where('id', $request->id);
        } elseif ($request->filled('billNumber')) {

            $query->where('billNumber', $request->billNumber);
        } else {

            if ($request->filled('dumpTruckOwnerId')) {
                $query->where('dumpTruckOwner_id', $request->dumpTruckOwnerId);
            } elseif ($request->filled('dumpTruckOwnerName') || $request->filled('dumpTruckOwnerLastName')) {

                if (
                    $request->filled('dumpTruckOwnerName')
                ) {
                    $queryDumpTruckOwner->where('name', 'LIKE', "%{$request->dumpTruckOwnerName}%");
                }

                if (
                    $request->filled('dumpTruckOwnerLastName')
                ) {
                    $queryDumpTruckOwner->where('lastName', 'LIKE', "%{$request->dumpTruckOwnerLastName}%");
                }
              
                $queryDumpTruckOwnerIds = $queryDumpTruckOwner->pluck('id')->toArray();
                $query->whereIn('dumpTruckOwner_id', $queryDumpTruckOwnerIds);
            }

            if ($request->filled('dumpTruckId')) {
                $query->where('truck_id', $request->dumpTruckId);
            } elseif ($request->filled('numberplate')) {
                $queryDumpTruck->where('truckType',  'کمپرسی');
                $parts = explode('-', $request->numberplate); // جدا کردن رشته بر اساس '-'
                if (!empty($parts[0])) {
                    $queryDumpTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 1), "-", -1) LIKE ?', ["%{$parts[0]}%"]);
                }

                if (!empty($parts[1])) {
                    $queryDumpTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 2), "-", -1) LIKE ?', ["%{$parts[1]}%"]);
                }
                if (!empty($parts[2])) {
                    $queryDumpTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 3), "-", -1)  LIKE ?', ["%{$parts[2]}%"]);
                }

                if (!empty($parts[3])) {
                    $queryDumpTruck->whereRaw('SUBSTRING_INDEX(SUBSTRING_INDEX(numberplate, "-", 4), "-", -1)  LIKE ?', ["%{$parts[3]}%"]);
                }
              
                $queryDumpTruckIds = $queryDumpTruck->pluck('id');
                $query->whereIn('truck_id', $queryDumpTruckIds);
            }

            if ($request->filled('sandRemittanceId')) {
                $query->where('sandRemittance_id', $request->sandRemittanceId);
            } elseif ($request->filled('sandRemittanceNumber')) {
                $querySandRemittance->where('remittanceNumber', $request->sandRemittanceNumber);
                $sandRemittanceId = $querySandRemittance->pluck('id');
                

                $query->wherein('sandRemittance_id', $sandRemittanceId);
            } elseif (
                $request->filled('sandRemittanceBuyerName') ||
                $request->filled('sandRemittanceBuyerLastName') ||
                $request->filled('sandRemittancePrice') ||
                $request->filled('factory')
            ) {
                Log::info('sandRemittanceName');
                
                // شروط ساده
                $conditions = [
                    'buyerName' => $request->filled('sandRemittanceBuyerName') ? '%' . $request->input('sandRemittanceBuyerName') . '%' : null,
                    'buyerLastName' => $request->filled('sandRemittanceBuyerLastName') ? '%' . $request->input('sandRemittanceBuyerLastName') . '%' : null,
                    'price' => $request->input('sandRemittancePrice'),
                    'factory' => $request->input('factory'),
                ];
            
                Log::info('Conditions:', $conditions);
                
                foreach ($conditions as $key => $value) {
                    if ($value !== null) {
                        if ($key != 'price') {
                            $querySandRemittance->where($key, 'like', $value);
                        } else {
                            $querySandRemittance->where($key, $value);
                        }
                    }
                }
            
                $sandRemittanceIds = $querySandRemittance->pluck('id');
                Log::info('Sand Remittance IDs:', $sandRemittanceIds->toArray());
                
                $query->whereIn('sandRemittance_id', $sandRemittanceIds);
            }
            
            
            // if (
            //     $request->filled('sandRemittanceBuyerName') ||
            //     $request->filled('sandRemittanceBuyerLastName') ||
            //     $request->filled('sandRemittancePrice') ||
            //     $request->filled('factory')
            // ) {
            //     Log::info('sandRemittanceName');
            //     // شروط ساده
            //     $conditions = [
            //         'buyerName' => $request->sandRemittanceBuyerName ? '%' . $request->sandRemittanceBuyerName . '%' : null,
            //         'buyerLastName' => $request->buyerLastName ? '%' . $request->buyerLastName . '%' : null,
            //         'remainingPrice' => $request->sadnRemittancePrice,
            //         'factory' => $request->factory,
            //     ];
                
                
            //     foreach ($conditions as $key => $value) {
            //         if ($request->filled($key)) {
            //             if ($key !='remainingPrice') {
            //                 $querySandRemittance->where($key, 'like', $value);
            //             } else {
            //                 // $querySandRemittance->where($key, $value);

            //             }
                        
            //         }
            //     }

            //     $sandRemittanceIds = $querySandRemittance->pluck('id');
            //     Log::info($sandRemittanceIds);
            //     $query->whereIn('sandRemittance_id', $sandRemittanceIds);
            // }

            if ($request->filled('sandType')) {
                $query->where('sandType', $request->sandType);
            }

            if ($request->filled('sandStoreId')) {
                $query->where('sandStore_id', $request->sandStoreId);
            }

            // شرط تاریخ
            if ($request->filled('date')) {
                $query->where('date', $request->date);
            } elseif ($request->filled('startDate') || $request->filled('endDate')) {
                $query->when($request->filled('startDate') && $request->filled('endDate'), function ($q) use ($request) {
                    $q->whereBetween('created_at', [$request->startDate, $request->endDate]);
                })
                    ->when($request->filled('startDate') && !$request->filled('endDate'), function ($q) use ($request) {
                        $q->where('created_at', '>=', $request->startDate);
                    })
                    ->when(!$request->filled('startDate') && $request->filled('endDate'), function ($q) use ($request) {
                        $q->where('created_at', '<=', $request->endDate);
                    });
            }
        }

        $sandInvoices = $query->orderByDesc('id')->with(['truck.customer', 'sandRemittance'])->paginate(50);
        return response()->json(['sandInvoices' => $sandInvoices], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSandInvoiceRequest $request)
    {
        try {
            DB::beginTransaction();
            $sandRemittance_id = $request->validated()['sandRemittance_id'];
            $totalPrice = $request->validated()['totalPrice'];

            $dumpTruckOwner_id = $request->validated()['dumpTruckOwner_id'];
            $totalFare = $request->validated()['totalFare'];

            $sandStore_id = $request->validated()['sandStore_id'];
            $weight = $request->validated()['weight'];

            $sandInvoice = new SandInvoice();
            $sandInvoice->fill($request->validated());
            $sandInvoice->save();

            $this->sandRemittanceDeduction($sandRemittance_id, $totalPrice);

            // $this->cementDeduction($key['cementStore_id'], $key['concrete_id'], $key['cubicMeters']);
            // $this->sandDeduction($key['concrete_id'], $key['cubicMeters']);
            // $this->GravelDeduction($key['concrete_id'], $key['cubicMeters']);
            // $this->waterDeduction($key['concrete_id'], $key['cubicMeters']);
            $this->dumpTruckOwnerSalary($dumpTruckOwner_id, $totalFare);
            // $this->customerDebt($customer_id, $key['totalPrice']);
            $this->addingToSandStore($sandStore_id, $weight);





            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;
        }

        return response()->json(['sandInvoice' =>  $sandInvoice], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(SandInvoice $sandInvoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SandInvoice $sandInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSandInvoiceRequest $request, SandInvoice $sandInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SandInvoice $sandInvoice)
    {
        //
    }

    public function fetchData()
    {
        $count = $this->count();
        $sandRemittances = $this->sandRemittances();
        $dumpTrucks = $this->dumpTrucks();
        $drivers = $this->drivers();
        $sandStores = $this->sandStores();

        return response()->json([
            'count' => $count,
            'sandRemittances' => $sandRemittances,
            'dumpTrucks' => $dumpTrucks,
            'drivers' => $drivers,
            'sandStores' => $sandStores
        ]);
    }

    /**
     * برای کامپوننت Search که در کامپوننت Show به کار گرفته شده است
     */
    public function fetchDataForSearch()
    {
        $dumpTrucks = $this->dumpTrucks();
        $drivers = $this->drivers();
        $sandStores = $this->sandStores();

        return response()->json([
            'dumpTrucks' => $dumpTrucks,
            'drivers' => $drivers,
            'sandStores' => $sandStores
        ]);
    }

    private function count(): int
    {
        return SandInvoice::count();
    }

    private function sandRemittances()
    {
        return SandRemittance::where('isCompleted', true)->get();
    }

    private function dumpTrucks(): Collection
    {
        return Truck::dumpTrucks()->get();
    }

    private function drivers()
    {
        return Driver::get();
    }

    private function sandStores()
    {
        return SandStore::get();
    }

    /**
     * قیمت کل بار را از حواله مربوطه کم می‌کند
     */
    private function sandRemittanceDeduction(int $sandRemittance_id, int|float $totalPrice)
    {

        $sandRemittance = SandRemittance::find($sandRemittance_id);
        $sandRemittance->remainingPrice -= $totalPrice;
        $sandRemittance->save();
    }

    /**
     * کرایه میکسر را به حساب مالک اضافه می کند
     */
    private function dumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare)
    {
        Financial::updateOrCreate(
            ['customer_id' => $dumpTruckOwner_id],
            ['creditor' => DB::raw('creditor + ' . $totalFare)]
        );
    }

    /**
     * #########
     * ###################### update dumpTruck owner account
     * #########
     */

    private function updateDumpTruckOwnerAccount(int $dumpTruckOwner_id, int $totalFare, int $preOwnerId, int $preFare)
    {
        if ($dumpTruckOwner_id == $preOwnerId && $totalFare == $preFare) {
            # هیچ تغییری در تعویض کامیون و کرایه بار ایجاد نشده
            # بر همین اساس هیچ عملیاتی صورت نمی‌گیرد
        } elseif ($dumpTruckOwner_id == $preOwnerId) {
            $this->updateSameDumpTruckOwnerSalary($dumpTruckOwner_id, $totalFare, $preFare);
        } else {
            $this->updateDifferentDumpTruckOwnerSalary($dumpTruckOwner_id, $totalFare, $preOwnerId, $preFare);
        }
    }

    private function updateSameDumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare, int $preFare)
    {
        $financial = Financial::where('customer_id', $dumpTruckOwner_id)->first();
        $financial->creditor -= $preFare;
        $financial->creditor += $totalFare;
        $financial->save();
    }

    /**
     * هنگامی که سیلو تغییر کرده باشد، ابتدا مقدار سیمانی که قبلا از سیلوی قبلی کم
     * شده بود به همان سیلو اضافه می شود و سپس مقدار سیمان مصرف شده جدید از سیلوی 
     * فعلی کم می شود
     */
    private function updateDifferentDumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare, int $preOwnerId, int $preFare)
    {
        $this->decreaseDumpTruckOwnerSalary($preOwnerId, $preFare);
        $this->increaseDumpTruckOwnerSalary($dumpTruckOwner_id,  $totalFare);
    }

    private function decreaseDumpTruckOwnerSalary(int $preOwnerId, int $preFare)
    {

        $financial = Financial::where('customer_id', $preOwnerId)->first();
        $financial->creditor -= $preFare;
        $financial->save();
    }

    private function increaseDumpTruckOwnerSalary(int $dumpTruckOwner_id, int $totalFare)
    {
        $financial = Financial::where('customer_id', $dumpTruckOwner_id)->first();
        $financial->creditor += $totalFare;
        $financial->save();
    }

    /**
     * اضافه کردن وزن بار به سیلوی مربوطه
     */
    private function addingToSandStore(int $sadnStore_id, int $weight)
    {
        $sandStore = SandStore::find($sadnStore_id);
        $sandStore->amount += $weight;
        $sandStore->save();
    }
}
