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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('lastName')->index();
            $table->string('father')->nullable();
            $table->string('nationalCode')->nullable()->index()->unique()->comment('کد ملی');
            $table->date('dateOfBirth')->nullable();
            $table->string('mobile')->nullable()->index()->unique();
            $table->string('telephone')->nullable();
            $table->string('email')->nullable();
            $table->string('postalCode')->nullable();
            $table->mediumText('address')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
