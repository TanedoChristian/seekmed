<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Pusher\Pusher;

class RiderController extends Controller
{

    public function register() {
        return Inertia::render(
            'Auth/RiderRegister'
        );
    }

    public function index() {
        $orders = DB::select('
            SELECT
                orders.address,
                users.id as user_id,
                carts.id as cart_id,
                carts.status,
                orders.id as order_id,
                concat(users.first_name, " ", users.last_name) as name
            FROM users
            INNER JOIN carts ON carts.user_id = users.id
            INNER JOIN orders ON orders.cart_id = carts.id
            WHERE orders.STATUS = "pending"
        ');

        return Inertia::render(
            'Rider/Dashboard', [
                'orders' => $orders,
            ]
        );
    }



    public function getCustomerCarts($id) {
        $orders = DB::select("
       SELECT
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
WHERE orders.id = ?
    ", [$id]);

        return response()->json($orders);
    }


    public function acceptOrders(Request $request) {

        // Delivery::create([
        //     'DELIVERY_STATUS' => 'pending',
        //     'ORDER_ID' => $request->order_id,
        //     'RIDER_ID' => Auth::guard('rider')->id(),
        // ]);

        // $cart_id = $request->cart_id;
        // $cart = Cart::findOrFail($cart_id);



        // $cart->update(['status' => 'deliver']);
        // DB::update('UPDATE cart_items set status = "deliver" where cart_id = ?', [$cart_id]);


        $pusher = new Pusher(
            '0f60d240a7e37c6b2818',
            '7e581cbd1c107cd7cdb4',
            '1874365',
            [
                'cluster' => 'ap1',
                'useTLS' => true
            ]
        );

        $tempChannel = "accept-order-$request->user_id";

        $pusher->trigger($tempChannel, 'my-event', [
            'newOrder' => true,
        ]);



        return response()->json(['Success' =>Auth::guard('rider')->id()]);
    }
}
