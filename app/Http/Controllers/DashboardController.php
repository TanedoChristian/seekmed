<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Dashboard/Home', [
            'products' => $products,
        ]);
    }
}
