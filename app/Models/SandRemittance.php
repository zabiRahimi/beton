<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SandRemittance extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function sandInvoice(): HasOne
    {
        return $this->hasOne(SandInvoice::class);
    }

    public function receipt(): HasOne
    {
        return $this->hasOne(Receipt::class, 'sand_remittance_id');
    }
}
