<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Driver extends Model
{
    use HasFactory;
    
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function concreteSalesInvoice():HasMany
    {
        return $this->hasMany(ConcreteSalesInvoice::class);
    }

    public function sandInvoice(): HasOne
    {
        return $this->hasOne(SandInvoice::class);
    }
}
