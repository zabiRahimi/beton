<?php

use App\Http\Controllers\CementStoreController;
use App\Http\Controllers\ConcreteController;
use App\Http\Controllers\ConcreteSalesInvoiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerTypeController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PersonnelSlipController;
use App\Http\Controllers\SandInvoiceController;
use App\Http\Controllers\SandStoreController;
use App\Http\Controllers\TruckController;
use App\Http\Controllers\WaterStoreController;

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

Route::controller(PersonnelSlipController::class)->group(function () {
    
    Route::post('/addPersonnelSlip', 'store');
    Route::get('/getPersonnelSlips', 'index');
    Route::get ('/getPersonnels','personnels');
    Route::patch('/editPersonnelSlip/{personnelSlip}', 'update');

});

Route::controller(HomeController::class)->group(function () {
    
    Route::get('/getCementInventorys', 'getCementInventorys');
    Route::get('/getSandInventorys', 'getSandInventorys');
    Route::get ('/getWaterInventorys','getWaterInventorys');

});

Route::controller(CementStoreController::class)->group(function () {
    
    Route::post('/addCementStore', 'store');
    Route::get('/getCementStores', 'index');
    Route::patch('/editCementStore/{cementStore}', 'update');

});

Route::controller(SandStoreController::class)->group(function () {
    
    Route::post('/addSandStore', 'store');
    Route::get('/getSandStores', 'index');
    Route::patch('/editSandStore/{sandStore}', 'update');

});

Route::controller(WaterStoreController::class)->group(function () {
    
    Route::post('/addWaterStore', 'store');
    Route::get('/getWaterStores', 'index');
    Route::patch('/editWaterStore/{waterStore}', 'update');

});

Route::resource('concreteSalesInvoices', ConcreteSalesInvoiceController::class);
Route::controller(ConcreteSalesInvoiceController::class)->group(function () {
    
    Route::get('/concreteSalesInvoice/concreteBuyers', 'concreteBuyers');
    Route::get('/getCSIConcretes', 'getCSIConcretes');
    Route::get('/concreteSalesInvoice/mixers', 'mixers');
    Route::get('/concreteSalesInvoice/drivers', 'drivers');
    Route::get('/getCSICementStores', 'getCSICementStores');
    // Route::post('/addConcreteSalesInvoice', 'store');
    // Route::get('/getConcreteSalesInvoices', 'index');
    // Route::get('/getCSIMixers', 'getCSIMixers');
    // Route::get('/getCSIDrivers', 'getCSIDrivers');
    // Route::patch('/editConcreteSalesInvoice/{concreteSalesInvoice}', 'update');

});

Route::resource('sandInvoices', SandInvoiceController::class);

Route::controller(SandInvoiceController::class)->group(function () {
    
    // Route::post('/addSandInvoice', 'store');
    // Route::get('/getSandInvoices', 'index');
    Route::get('/sandInvoice/getSandSellers', 'getSandSellers');
    Route::get('/sandInvoice/getSandStores', 'getSandStores');
    // Route::get('/getCSIConcretes', 'getCSIConcretes');
    // Route::get('/getCSIMixers', 'getCSIMixers');
    // Route::get('/getCSIDrivers', 'getCSIDrivers');
    // Route::get('/getCSICementStores', 'getCSICementStores');
    // Route::patch('/editConcreteSalesInvoice/{concreteSalesInvoice}', 'update');

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
