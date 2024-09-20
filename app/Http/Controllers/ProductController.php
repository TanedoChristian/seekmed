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
            'IS_WHOLESALE' => 'nullable',
            'EXPIRY_DATE' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


            $imageBlob = file_get_contents($request->file('image'));


        $product = Product::create([
            'PRODUCT_NAME' => $request->PRODUCT_NAME,
            'DESCRIPTION' => $request->DESCRIPTION,
            'STOCK_QUANTITY' => $request->STOCK_QUANTITY,
            'PRICE' => $request->PRICE,
            'TOTAL_INVENTORY' => $request->TOTAL_INVENTORY,
            'IS_WHOLESALE' => 0,
            'EXPIRY_DATE' => $request->EXPIRY_DATE,
            'image' => $imageBlob,
        ]);

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Success'], 200);
    }
}
