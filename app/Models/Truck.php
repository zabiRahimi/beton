<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;



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

    public function sandInvoice(): HasMany
    {
        return $this->hasMany(SandInvoice::class);
    }

    public static function getMixers() {
        return self::where('truckType', 'میکسر')->with('customer')->get();
    }

    public static function getDumpTrucks() {
        return self::where('truckType', 'کمپرسی')->with('customer')->get();
    }
}
