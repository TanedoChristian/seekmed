<?php

namespace App\Http\Controllers;

use App\Models\DeliveryRider;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
{
    $products = Product::all();
    $riders = DeliveryRider::all();

    return Inertia::render('Admin/Dashboard', [
        'products' => $products,
        'riders' => $riders
    ]);
}

    public function getAll()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'PRODUCT_NAME' => 'required|string|max:255',
            'DESCRIPTION' => 'nullable|string',
            'STOCK_QUANTITY' => 'required|integer',
            'PRICE' => 'required|numeric',
            'TOTAL_INVENTORY' => 'nullable|integer',
            'IS_WHOLESALE' => 'nullable|boolean',
            'EXPIRY_DATE' => 'nullable|date',
        ]);

        $product = Product::create($request->all());
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Success'], 200);
    }
}
