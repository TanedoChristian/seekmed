<?php

namespace App\Http\Controllers;

use App\Models\DeliveryRider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class DeliveryRiderController extends Controller
{
    public function index()
    {
        $rider = DeliveryRider::all();
        return response()->json($rider);
    }

    public function store(Request $request){


        $rider = DeliveryRider::create([
            'FNAME' => $request->FNAME,
            'LNAME' => $request->LNAME,
            'EMAIL' => $request->EMAIL,
            'password' => Hash::make($request->password),
            'CONTACTNO' => $request->CONTACTNO,
        ]);

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
