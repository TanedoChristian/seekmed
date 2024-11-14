<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryRiderController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PusherController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReturnController;
use App\Http\Controllers\RiderController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/products/{id}', [OrderController::class, 'index'])->middleware(['auth', 'verified']);



Route::get('/', function() {
    return Inertia::render('HomePage');
})->name('home');


Route::post('/products', [ProductController::class, 'store']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);



Route::get('/register/rider', [RiderController::class, 'register']);


Route::middleware('auth:rider')->group(function (){
    Route::get('/rider/dashboard', [RiderController::class, 'index'])->name('rider.dashboard');
});

Route::middleware('auth:admin')->group(function (){
    Route::get('/admin/dashboard', [ProductController::class, 'index'])->name('admin.dashboard');
});



Route::prefix('api')->group(function() {
    Route::delete('/reviews/{id}', [RatingController::class, 'removeRating']);
    Route::delete('/returns/{id}', [ReturnController::class, 'removeReturn']);
    Route::delete('/admin/{id}', [AdminController::class, 'destroy']);
    Route::post('/return', [ReturnController::class, 'store']);
    Route::post('/reviews', [RatingController::class, 'store']);
    Route::get('/customer/orders', [DashboardController::class, 'getOrders']);
    Route::get('/products', [ProductController::class, 'getAll']);
    Route::get('/rider', [DeliveryRiderController::class, 'index']);
    Route::post('/rider', [DeliveryRiderController::class, 'store']);
    Route::put('/rider/{id}', [DeliveryRiderController::class, 'update']);
    Route::get('/rider/orders/history', [DeliveryRiderController::class, 'GetOrderHistory']);
    Route::delete('/rider/{id}', [DeliveryRiderController::class, 'destroy']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/update', [OrderController::class, 'updateStatus']);
    Route::put('/products/{id}', [ProductController::class, 'updateQuantity']);



    Route::post('/carts', [CartItemController::class, 'store']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);

    Route::get('customer/carts/{id}', [RiderController::class, 'getCustomerCarts']);
    Route::post('accept-orders', [RiderController::class, 'acceptOrders']);

});

Route::post('/message', [ChatController::class, 'sendMessage']);
Route::post('/broadcast', [PusherController::class, 'broadcast']);
Route::post('/receive', [PusherController::class, 'receive']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';
