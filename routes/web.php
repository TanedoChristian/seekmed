<?php

use App\Http\Controllers\DeliveryRiderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/admin/dashboard', [ProductController::class, 'index']);




Route::post('/products', [ProductController::class, 'store']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::prefix('api')->group(function() {
    Route::get('/products', [ProductController::class, 'getAll']);

    Route::get('/rider', [DeliveryRiderController::class, 'index']);
    Route::post('/rider', [DeliveryRiderController::class, 'store']);
    Route::put('/rider/{id}', [DeliveryRiderController::class, 'update']);
    Route::delete('/rider/{id}', [DeliveryRiderController::class, 'destroy']);

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';
