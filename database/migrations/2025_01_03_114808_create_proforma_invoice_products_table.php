<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proforma_invoice_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proforma_invoice_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('product', 50);
            $table->string('type', 40)->nullable();
            $table->string('amount', 8);
            $table->string('unit', 50)->comment('واحد اندازه‌گیری');
            $table->string('unitPrice', 8);
            $table->string('totalPrice', 12);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proforma_invoice_products');
    }
};
