<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order; // Make sure to import your Order model

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
        $totalAmount = 0;
        foreach ($request->active_carts as $cartItem) {
            $totalAmount += $cartItem['price'] * $cartItem['quantity'];
        }

        $order = Order::create([
            'TOTAL_AMOUNT' => $totalAmount,
            'PAYMENT_METHOD' => 'COD',
            'USER_ID' => $request->user_id,
            'ORDER_DATE' => now(),
            'PRICE' => $totalAmount,
        ]);

        return response()->json(['message' => 'Order created successfully!', 'order_id' => $order->id], 201);
    }
}
