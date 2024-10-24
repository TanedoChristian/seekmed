<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    public function store(Request $request) {
        $cart = Cart::where('user_id', Auth::id())->latest()->first();

        if (!$cart || $cart->status === 'done') {
            $cart = Cart::create([
                'user_id' => Auth::id(),
                'status' => 'pending'
            ]);
        }

        $existingItem = CartItem::where('cart_id', $cart->id)
                                 ->where('product_id', $request->id)
                                 ->where('status', 'pending')
                                 ->first();

        if ($existingItem) {
            $existingItem->quantity += $request->quantity;
            $existingItem->save();

            return response()->json(['success' => 'Quantity updated', 'cart_id' => $cart->id], 200);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->id,
                'quantity' => $request->quantity,
                'price' => $request->price
            ]);
            return response()->json(['success' => 'Item added to cart', 'cart_id' => $cart->id], 200);
        }
    }
}
