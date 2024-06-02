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
        Schema::create('concrete_solds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('concreteSalesInvoices_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('concrete_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('concreteSalesInvoices_id')->constrained()->onUpdate('cascade')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concrete_solds');
    }
};
