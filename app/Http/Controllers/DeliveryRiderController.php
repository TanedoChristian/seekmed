<?php

namespace App\Http\Controllers;

use App\Models\DeliveryRider;
use Illuminate\Http\Request;

class DeliveryRiderController extends Controller
{
    public function index()
    {
        $rider = DeliveryRider::all();
        return response()->json($rider);
    }

    public function store(Request $request){
        $rider = DeliveryRider::create($request->all());
        return response()->json($rider);
    }

    public function update(Request $request, $id)
    {

        $rider = DeliveryRider::findOrFail($id);

        $validatedData = $request->validate([
            'FNAME' => 'string',
            'LNAME' => 'string',
            'EMAIL' => 'string',
            'CONTACTNO' => 'string',
        ]);

        $rider->update($validatedData);
        return response()->json($rider);
    }

    public function destroy($id)
    {
        $rider = DeliveryRider::findOrFail($id);
        $rider->delete();
        return response()->json(['message' => 'Success'], 200);
    }
}
