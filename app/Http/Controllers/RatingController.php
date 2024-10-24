<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Ratings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    //

    public function store(Request $request) {
       $rating =  Ratings::create([

            'USER_ID' => Auth::id(),
            'FEEDBACK' => $request->FEEDBACK,
            'RATING' => $request->Rating,
            'product_id' => $request->product_id,
        ]);


        // $order = Order::findOrFail($request->order_id);

        // $order->update(['status' => 'reviewed']);
        // $order->save();


        return response()->json($rating);
    }
}
