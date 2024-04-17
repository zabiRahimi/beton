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
        Schema::create('personnel_contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->date('startContract')->nullable()->comment('تاریخ شروع قرارداد');
            $table->date('endContract')->nullable()->comment('تاریخ پایان قرارداد');
            $table->string('calculateWages')->comment('نحوه محاسبه مزد');
            $table->string('fixedSalary')->comment('مزد ثابت');
            $table->string('workFriday')->nullable()->comment('مبلغ جمعه کاری و تعطیل کاری بر اساس ساعت');
            $table->string('overtime')->nullable()->comment('مبلغ اضافه کاری');
            $table->string('absencePenalty')->nullable()->comment('مبلغ جریمه غیبت براساس ساعت');
            $table->boolean('insuranceStatus')->nullable()->default(1)->comment('وضعیت بیمه');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnel_contracts');
    }
};
