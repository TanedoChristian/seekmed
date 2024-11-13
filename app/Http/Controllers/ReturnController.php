<?php

namespace App\Http\Controllers;

use App\Models\ReturnItem;
use Illuminate\Http\Request;

class ReturnController extends Controller
{
    //

    public function store(Request $request) {

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $imageUrl = asset('storage/' . $imagePath);
        } else {
            return response()->json(['error' => 'Image not provided'], 400);
        }

        ReturnItem::create([
            'QUANTITY' => $request->QUANTITY,
            'REASON' => $request->REASON,
            'ORDER_ID' => $request->ORDER_ID,
            'PRODUCT_ID' => $request->PRODUCT_ID,
            'image' => $imageUrl
        ]);

        return response()->json(['Message' => 'Success']);
    }
}
