<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Receipt extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function customer(): BelongsTo 
    { 
        return $this->belongsTo(Customer::class);
     }

     // نکته مهم، مدل زیر باید ایجاد شود

    // public function documentReceivable(): BelongsTo
    // {
    //     return $this->belongsTo(documentReceivable::class, 'document_receivable_id');
    // }

    public function sandRemittance(): BelongsTo
    {
        return $this->belongsTo(SandRemittance::class, 'sand_remittance_id');
    }

     // نکته مهم، مدل زیر باید ایجاد شود

    // public function cementRemittance(): BelongsTo
    // {
    //     return $this->belongsTo(CementRemittance::class, 'cement_remittance_id');
    // }


}
