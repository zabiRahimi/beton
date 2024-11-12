<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use App\Events\ConcreteSalesInvoiceChanged;

class UpdateConcreteSalesInvoiceCache
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
    public function handle(ConcreteSalesInvoiceChanged $event): void
    {
        // به‌روزرسانی کش 
        Cache::forget('concreteSalesInvoice_count');
        $count = \App\Models\ConcreteSalesInvoice::count();
        Cache::forever('concreteSalesInvoice_count', $count);
    }
}
