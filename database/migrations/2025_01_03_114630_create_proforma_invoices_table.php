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
        Schema::create('proforma_invoices', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('buyer', 110);
            $table->string('address')->nullable();
            $table->string('nationalCode', 22)->nullable()->index()->comment('کد ملی');
            $table->string('tel', 22)->nullable();
            $table->boolean('isTax')->comment('ارزش افزوده');
            $table->mediumText('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proforma_invoices');
    }
};
