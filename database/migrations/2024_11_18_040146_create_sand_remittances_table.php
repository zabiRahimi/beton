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
        Schema::create('sand_remittances', function (Blueprint $table) {
            $table->id();
            $table->string('buyerName', 50);
            $table->string('buyerLastName', 50);
            $table->string('factory', 50);
            $table->string('amount', 25);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sand_remittances');
    }
};
