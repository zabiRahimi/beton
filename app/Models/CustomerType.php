<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CustomerType extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $guarded = ['id'];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    // public function customers():BelongsToMany
    // {
    //     return $this->belongsToMany(Customer::class, 'customer_type_selecteds');
    // }

}
