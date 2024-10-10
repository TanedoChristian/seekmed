<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\Order; // Make sure to import your Order model
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Store a new order based on the active carts.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $cartId = Cart::where('user_id', Auth::id())->value('id');
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
}
