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

        CartItem::create([
            'cart_id' => $cartId,
            'product_id' => $request->id,
            'quantity' => $request->quantity,
            'price' => $request->price
        ]);

        return response()->json(['success' => $cartId], 200);
    }
}
