<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Truck extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function concreteSalesInvoice():HasMany
    {
        return $this->hasMany(ConcreteSalesInvoice::class);
    }

    public function sandInvoice(): HasOne
    {
        return $this->hasOne(SandInvoice::class);
    }

    public function scopeMixers($query) {
        return $query->where('truckType', 'میکسر')->with('customer');
    }

    public function scopeDumpTrucks($query) {
        return $query->where('truckType', 'کمپرسی')->with('customer');
    }
    
}
