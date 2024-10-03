<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryRiderController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PusherController;
use App\Http\Controllers\RiderController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/admin/dashboard', [ProductController::class, 'index']);

Route::get('/', function() {
    return Inertia::render('HomePage');
});


Route::post('/products', [ProductController::class, 'store']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::get('/rider/dashboard', [RiderController::class, 'index']);




Route::prefix('api')->group(function() {
    Route::get('/products', [ProductController::class, 'getAll']);
    Route::get('/rider', [DeliveryRiderController::class, 'index']);
    Route::post('/rider', [DeliveryRiderController::class, 'store']);
    Route::put('/rider/{id}', [DeliveryRiderController::class, 'update']);
    Route::delete('/rider/{id}', [DeliveryRiderController::class, 'destroy']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/carts', [CartItemController::class, 'store']);
    Route::post('/messages', [MessageController::class, 'store']);

    Route::put('/users/{id}', [UserController::class, 'update']);

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
