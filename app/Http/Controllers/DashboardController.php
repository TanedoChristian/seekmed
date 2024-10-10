<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $id = Auth::id();
        $orders = DB::select('SELECT * from orders where USER_ID = ? and orders.STATUS = "PENDING"', [$id]);
        $products = Product::all();
        return Inertia::render('Dashboard/Home', [
            'products' => $products,
            'orders' => $orders,
        ]);
    }

    public function getOrders(){
        $id = Auth::id();
        $orders = DB::select('SELECT
    cart_items.*,
    products.PRODUCT_NAME,
    products.image,
    orders.id AS order_id,
    orders.ORDER_DATE,
    orders.PAYMENT_METHOD,
    orders.STATUS,
    orders.USER_ID,
    orders.address,
    orders.contact_number
FROM cart_items
JOIN products ON products.id = cart_items.product_id
JOIN orders ON orders.cart_id = cart_items.cart_id
WHERE orders.USER_ID = ? AND orders.STATUS = "PENDING"', [$id]);


    return response()->json($orders);
    }
}
