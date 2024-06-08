<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

// use Morilog\Jalali\jDate;

class Customer extends Model
{
    use HasFactory;

    // public function getCreatedAtAttribute($value)
    // {
    //     return jDate::forge($value)->format('%Y-%m-%d %H:%M:%S');
    // }

    // public function getUpdatedAtAttribute($value)
    // {
    //     return jDate::forge($value)->format('%Y-%m-%d %H:%M:%S');
    // }

    protected $guarded = ['id', 'created_at', 'updated_at'];

    // public function customerTypes():BelongsToMany
    // {
    //     return $this->belongsToMany(CustomerType::class, 'customer_type_selecteds');
    // }

    public function customerType():HasMany
    {
        return $this->hasMany(CustomerType::class);
    }

    public function bankInfo(): HasMany
    {
        return $this->hasMany(BankInfo::class);
    }

    public function personnelSlip(): HasOne
    {
        return $this->hasOne(PersonnelSlip::class);
    }

    public function truck(): HasMany
    {
        return $this->hasMany(Truck::class);
    }

    public function financial(): HasOne
    {
        return $this->hasOne(Financial::class);
    }

    public function scopeConcreteBuyers($query)
    {
        return $query->whereHas('customerType', function ($query) {
            $query->where('code', 1);
        });
    }

}
