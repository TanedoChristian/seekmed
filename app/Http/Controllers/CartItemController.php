<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    public function store(Request $request) {
        $cartId = Cart::where('user_id', Auth::id())->value('id');
        $existingItem = CartItem::where('cart_id', $cartId)
                                 ->where('product_id', $request->id)
                                 ->where('status', 'pending')
                                 ->first();

        if ($existingItem) {
            $existingItem->quantity += $request->quantity;
            $existingItem->save();

            return response()->json(['success' => 'Quantity updated', 'cart_id' => $cartId], 200);
        } else {
            CartItem::create([
                'cart_id' => $cartId,
                'product_id' => $request->id,
                'quantity' => $request->quantity,
                'price' => $request->price
            ]);

            return response()->json(['success' => 'Item added to cart', 'cart_id' => $cartId], 200);
        }
    }
}
