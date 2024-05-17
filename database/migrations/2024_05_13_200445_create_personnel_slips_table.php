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
        Schema::create('personnel_slips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->date('contractStart')->nullable()->comment('شروع قرارداد');
            $table->string('contractPeriod')->nullable()->comment('مدت قرارداد');
            $table->string('wageCalculation')->comment('نوع محاسبه مزد');
            $table->string('salary')->comment('دست مزد');
            $table->string('workFriday')->comment('درصد جمعه‌کاری');
            $table->string('workHoliday')->comment('درصد تعطیل‌کاری');
            $table->string('overtime')->comment('درصد اضافه‌کاری');
            $table->string('insurance')->comment('وضعیت بیمه');
            $table->string('absencePenalty')->nullable()->comment('جریمه غیبت');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnel_slips');
    }
};
