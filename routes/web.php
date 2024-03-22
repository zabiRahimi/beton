<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerTypeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', function () {
    return view('welcome');
   
});
// Route::controller(CustomerTypeController::class)->group(function () {
    
//     // Route::post('/addCustomerType', 'store');
//     Route::get('/getAllCustomerType', 'index');

// });
Route::get('/{any}', function () {
    return view('welcome');
})->where('any','.*');
// Route::controller(CustomerController::class)->group(function () {
    
//     Route::post('/addCustomer', 'store'
// );
// });
