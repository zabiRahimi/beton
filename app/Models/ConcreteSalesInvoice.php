<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Events\ConcreteSalesInvoiceChanged;

class ConcreteSalesInvoice extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $dispatchesEvents = [
        'created' => ConcreteSalesInvoiceChanged::class,
        'updated' => ConcreteSalesInvoiceChanged::class,
        'deleted' => ConcreteSalesInvoiceChanged::class,
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function concrete(): BelongsTo
    {
        return $this->belongsTo(Concrete::class);
    }

    public function cementStore(): BelongsTo
    {
        return $this->belongsTo(CementStore::class, 'cementStore_id');
    }

    public function truck(): BelongsTo
    {
        return $this->belongsTo(Truck::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }
}
