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
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('document_receivable_id')->nullable();
            $table->unsignedBigInteger('sand_remittance_id')->nullable();
            $table->unsignedBigInteger('cement_remittance_id')->nullable();
            $table->date('date');
            $table->string('price',22);
            $table->string('for')->comment('بابت');
            $table->string('how_to_pay');
            $table->string('number',40)->nullable();
            $table->string('bank',70)->nullable();
            $table->string('bank_branch',120)->nullable();
            $table->date('date_check')->nullable();
            $table->string('owner')->nullable();
            $table->mediumText('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};
