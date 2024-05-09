<?php

use App\Http\Controllers\ConcreteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerTypeController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\TruckController;

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
    Route::get('/getCustomers', 'index');
    Route::patch('/editCustomer/{customer}', 'update');

});


Route::controller(CustomerTypeController::class)->group(function () {
    
    Route::post('/addCustomerType', 'store');
    Route::get('/getCustomerTypes', 'index');
    Route::patch('/editCustomerType/{customerType}', 'update');

});

Route::controller(ConcreteController::class)->group(function () {
    
    Route::post('/addConcrete', 'store');
    Route::get('/getConcretes', 'index');
    Route::patch('/editConcrete/{concrete}', 'update');

});

Route::controller(DriverController::class)->group(function () {
    
    Route::post('/addDriver', 'store');
    Route::get('/getDrivers', 'index');
    Route::patch('/editDriver/{driver}', 'update');

});

Route::controller(TruckController::class)->group(function () {
    
    Route::post('/addTruck', 'store');
    Route::get('/getTrucks', 'index');
    Route::get ('/getTruckOwners','truckOwners');
    Route::patch('/editTruck/{truck}', 'update');

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
