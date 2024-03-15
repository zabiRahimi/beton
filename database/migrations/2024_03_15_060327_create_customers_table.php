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
            $table->string('nationalCode')->index()->unique()->comment('کد ملی');
            $table->date('dateOfBirth');
            $table->string('mobile')->index()->unique();
            $table->string('telephone');
            $table->string('telephone');

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
