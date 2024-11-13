<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\DeliveryRider;
use App\Models\Order;
use App\Models\Product;
use App\Models\Ratings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
{
    $products = Product::all();
    $riders = DeliveryRider::all();
    $orders = Order::all();
    $admins = Admin::all();
    //$reviews = Ratings::all();


    $reviews = DB::select('SELECT ratings_feedback.*, users.email  FROM ratings_feedback INNER JOIN users ON users.id = ratings_feedback.USER_ID');


    return Inertia::render('Admin/Dashboard', [
        'products' => $products,
        'riders' => $riders,
        'orders' => $orders,
        'admins' => $admins,
        'reviews' => $reviews
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

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public'); // Store image and get path

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

    public function updateQuantity(Request $request, $id) {


        if(isset($request->updateCart)) {
            $product = Product::findOrFail($id);
            $newQuantity = $product["STOCK_QUANTITY"] - $request->quantity;
            $product->update(['STOCK_QUANTITY' => $newQuantity]);
            $product->save();
            return response()->json(["Message" => 'Product updated']);
        }

        $product = Product::findOrFail($id);
        $product->update(['STOCK_QUANTITY' => $request->quantity]);
        $product->save();
        return response()->json(["Message" => 'Product updated']);
    }
}
