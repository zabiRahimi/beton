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
        Schema::create('concrete_sales_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('truck_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('driver_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('concrete_id')->constrained()->onUpdate('cascade')->onDelete('cascade');

            $table->date('date');
            $table->string('weight');
            $table->string('cubicMeters')->comment('متر مکعب');
            $table->string('unitPrice')->comment('قیمت واحد');
            $table->string('totalPrice')->comment('قیمت کل');
            $table->string('fare')->comment('کرایه میکسر');

            $table->string('maskanMeli')->nullable()->comment('مسکن ملی');
            $table->string('vahed')->nullable()->comment('واحد مسکن ملی');
            $table->string('address')->nullable();
            $table->string('concretingPosition')->nullable()->comment('موقعیت بتن ریزی');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concrete_sales_invoices');
    }
};
