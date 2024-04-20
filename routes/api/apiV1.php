<?php

use App\Http\Controllers\ConcreteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerTypeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::controller(CustomerController::class)->group(function () {
    
    Route::post('/addCustomer', 'store');
    Route::get('/getAllCustomer', 'index');
    Route::patch('/editCustomer/{customer}', 'update');

});


Route::controller(CustomerTypeController::class)->group(function () {
    
    Route::post('/addCustomerType', 'store');
    Route::get('/getAllCustomerType', 'index');
    Route::patch('/editCustomerType/{customerType}', 'update');

});

Route::controller(ConcreteController::class)->group(function () {
    
    Route::post('/addConcrete', 'store');
    Route::get('/getAllConcrete', 'index');
    Route::patch('/editConcrete/{concrete}', 'update');

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
