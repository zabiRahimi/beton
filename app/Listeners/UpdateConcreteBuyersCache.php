<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use App\Events\ConcreteBuyerChanged;
use App\Models\Customer;

class UpdateConcreteBuyersCache
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ConcreteBuyerChanged $event) {
         // پاک کردن کش موجود 
         Cache::forget('concreteSalesInvoice_concreteBuyers');
         // تاخیر کوچک برای جلوگیری از مشکلات همزمانی 
        usleep(100000);
          // به‌روزرسانی کش با مقدار جدید 
          $concreteBuyers = Customer::concreteBuyers()->get(); 
          Cache::forever('concreteSalesInvoice_concreteBuyers', $concreteBuyers);
         }
}
