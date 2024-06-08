<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Truck extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public static function getMixers() {
        return self::where('truckType', 'میکسر')->with('customer')->get();
    }
}
