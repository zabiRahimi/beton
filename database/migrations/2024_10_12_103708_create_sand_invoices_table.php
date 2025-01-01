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
        Schema::create('sand_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sandRemittance_id')->constrained('sand_remittances')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('truck_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('dumpTruckOwner_id')->constrained('customers')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('driver_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedSmallInteger('sandStore_id');
            // $table->string('remittanceNumber', 30)->nullable()->comment('شماره حواله');
            $table->string('billNumber',30)->comment('شماره قبض');
            $table->string('time', 25);
            $table->date('date');
            $table->string('setSandTypeSelected', 36);
            $table->string('weight', 5);
            $table->string('unitPrice', 10);
            $table->string('totalPrice', 10);
            $table->string('unitFare', 10);
            $table->string('totalFare', 10);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sand_invoices');
    }
};
