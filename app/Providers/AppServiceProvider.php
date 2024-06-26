<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Validator::extend('mobile', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^09[0-9]{9}$/', $value);
        });

        Validator::extend('tel', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^0[0-9]{10}$/', $value);
        });

        // Validator::extend('numberplate', function ($attribute, $value, $parameters, $validator) {
        //     return preg_match('/^[0-9]{2}-[آ-ی]{1}-[0-9]{3}-[0-9]{2}$/u', $value);
        // });

        Validator::extend('numberplate', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^[0-9]{2}-[0-9]{3}-[0-9]{2}-[آ-ی]{1}$/u', $value);
        });

        Validator::extend('time', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^(?:[01]?\\d|2[0-3]):(?:[0-5]\\d):(?:[0-5]\\d)$/', $value);
        });
        

    }
}
