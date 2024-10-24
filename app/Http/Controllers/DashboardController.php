<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Ratings;
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

        $reviews = DB::select('SELECT CONCAT(users.first_name, " ", users.last_name) as customer, ratings_feedback.* FROM ratings_feedback INNER JOIN users ON users.id = ratings_feedback.USER_ID');


        $products = Product::all();
        return Inertia::render('Dashboard/Home', [
            'products' => $products,
            'orders' => $orders,
            'reviews' => $reviews,
        ]);
    }

    public function getOrders(){
        $id = Auth::id();
        $orders = DB::select('SELECT
    cart_items.*,
    products.id,
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
WHERE orders.USER_ID = ?', [$id]) ;


    return response()->json($orders);
    }
}
