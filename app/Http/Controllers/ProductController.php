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
    // Validate the request
    $validatedData = $request->validate([
        'PRODUCT_NAME' => 'required|string|max:255',
        'DESCRIPTION' => 'required|string',
        'STOCK_QUANTITY' => 'required|numeric',
        'PRICE' => 'required|numeric',
        'TOTAL_INVENTORY' => 'required|numeric',
        'EXPIRY_DATE' => 'required|date',
        'image' => 'required|image', // Validate image upload
    ]);

    // Handle file upload
    if ($request->hasFile('image')) {
        // Store the image in the 'products' directory within the public disk
        $imagePath = $request->file('image')->store('products', 'public'); // Store image and get path

        // Generate a URL for the stored image
        $imageUrl = asset('storage/' . $imagePath); // Create a URL to access the image
    } else {
        return response()->json(['error' => 'Image not provided'], 400);
    }


    $product = Product::create([
        'PRODUCT_NAME' => $request->PRODUCT_NAME,
        'DESCRIPTION' => $request->DESCRIPTION,
        'STOCK_QUANTITY' => $request->STOCK_QUANTITY,
        'PRICE' => $request->PRICE,
        'TOTAL_INVENTORY' => $request->TOTAL_INVENTORY,
        'IS_WHOLESALE' => 0,
        'EXPIRY_DATE' => $request->EXPIRY_DATE,
        'image' => $imageUrl, // Store the URL instead of path
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
