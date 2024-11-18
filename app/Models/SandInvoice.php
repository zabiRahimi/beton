<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SandInvoice extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

   

    public function truck(): BelongsTo
    {
        return $this->belongsTo(Truck::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function sandRemittance()
    {
        return $this->belongsTo(SandRemittance::class, 'sandRemittance_id');
    }

    public function dumpTruckOwner()
    {
        return $this->belongsTo(Customer::class, 'dumpTruckOwner_id');
    }
}
