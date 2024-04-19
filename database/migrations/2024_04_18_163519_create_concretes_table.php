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
        Schema::create('concretes', function (Blueprint $table) {
            $table->id();
            $table->string('concreteName');
            $table->string('amountCement');
            $table->string('amountSand')->comment('مقدار ماسه');
            $table->string('amountGravel')->comment('مقدار شن');
            $table->string('amountWater');
            $table->string('unit')->nullable();
            $table->string('unitPrice')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concretes');
    }
};
