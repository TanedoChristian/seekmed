<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\Order; // Make sure to import your Order model
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Store a new order based on the active carts.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request) {

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
     ", [$request->id]);

        return Inertia::render('Products/Index', ['orders' => $orders]);
    }


    public function store(Request $request)
    {

        $cartId = Cart::where('user_id', Auth::id())->latest()->value('id');
        $userId = Auth::id();

        $order = Order::create([
            'PAYMENT_METHOD' => $request->PAYMENT_METHOD,
            'USER_ID' => $userId,
            'cart_id' => $cartId,
            'address' => $request->address,
            'contact_number' => $request->contact_number
        ]);
        return response()->json(['message' => 'Order created successfully!', 'order_id' => $order->id], 201);
    }

    public function updateStatus(Request $request)
    {

        if(isset($request->cart_id)){
            $cart = Cart::findOrFail($request->cart_id);
            $cart->update(['status' => 'done']);
            $cart->save();
        }

        if(!isset($request->id)) {
            $order = Order::where('USER_ID', Auth::id())
              ->where('status', 'pending')
              ->latest();

              $validateData = $request->validate([
                'STATUS' => 'string'
            ]);
            $order->update($validateData);
            return response()->json(['Message' => 'Order Updated']);
        }

        $order = Order::find($request->id);
        $validateData = $request->validate([
            'STATUS' => 'string'
        ]);
        $order->update($validateData);
        return response()->json(['Message' => 'Order Updated']);
    }
}



