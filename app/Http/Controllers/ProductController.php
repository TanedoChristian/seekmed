<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\DeliveryRider;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\Product;
use App\Models\Ratings;
use App\Models\ReturnItem;
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
    $returns = DB::select('SELECT r.*, o.ORDER_DATE, o.PAYMENT_METHOD, o.STATUS AS ORDER_STATUS, u.id AS USER_ID, u.first_name, u.last_name, u.email, u.address AS USER_ADDRESS, u.contact_no AS USER_CONTACT FROM returns r JOIN orders o ON r.ORDER_ID = o.id JOIN users u ON o.USER_ID = u.id');
    $inventories = DB::select('SELECT inventories.*, products.PRODUCT_NAME from inventories INNER JOIN products ON products.id = inventories.PRODUCT_ID');
    $productSoldPerMonth = DB::select('SELECT p.PRODUCT_NAME, SUM(ci.quantity) as total_quantity, MONTH(o.ORDER_DATE) as month FROM products p LEFT JOIN cart_items ci ON p.id = ci.product_id LEFT JOIN orders o ON ci.cart_id = o.cart_id WHERE o.STATUS = "done" AND YEAR(o.ORDER_DATE) = YEAR(CURDATE())  GROUP BY p.id, p.PRODUCT_NAME, MONTH(o.ORDER_DATE) ORDER BY MONTH(o.ORDER_DATE), total_quantity DESC');
    $totalRevenuePerProduct = DB::SELECT('SELECT      products.PRODUCT_NAME,      SUM(CASE          WHEN orders.status = "done" THEN cart_items.quantity * cart_items.price          ELSE 0      END) as total_price FROM      products  LEFT JOIN      cart_items ON products.id = cart_items.product_id LEFT JOIN      orders ON orders.cart_id = cart_items.cart_id GROUP BY      products.id, products.PRODUCT_NAME ORDER BY      total_price');


    $reviews = DB::select('SELECT ratings_feedback.*, users.email  FROM ratings_feedback INNER JOIN users ON users.id = ratings_feedback.USER_ID');
    $totalReturnPerProduct = DB::select('SELECT p.id AS PRODUCT_ID, p.PRODUCT_NAME, MONTH(r.RETURN_DATE) AS RETURN_MONTH, COUNT(r.id) AS TOTAL_RETURNS FROM  returns r JOIN products p ON r.PRODUCT_ID = p.id GROUP BY  p.id, p.PRODUCT_NAME, MONTH(r.RETURN_DATE) ORDER BY RETURN_MONTH');

    return Inertia::render('Admin/Dashboard', [
        'products' => $products,
        'riders' => $riders,
        'orders' => $orders,
        'admins' => $admins,
        'reviews' => $reviews,
        'inventories' => $inventories,
        'totalRevenuePerProduct' => $totalRevenuePerProduct,
        'productsSoldPerMonth' => $productSoldPerMonth,
        'returns' => $returns,
        'totalReturnPerProduct' => $totalReturnPerProduct
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

    Inventory::create([
        'PRODUCT_ID' => $product->id,
        'QUANTITY_CHANGE' => $product->STOCK_QUANTITY,
        'CHANGE_TYPE' => 'Create',
        'ADMIN_ID' => 1
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

        Inventory::create([
            'PRODUCT_ID' => $product->id,
            'QUANTITY_CHANGE' => $product->STOCK_QUANTITY,
            'CHANGE_TYPE' => 'Add',
            'ADMIN_ID' => 1
        ]);

        return response()->json(["Message" => 'Product updated']);
    }
}
