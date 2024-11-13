<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    //

    public function get(){
        return response()->json(Admin::all());
    }

    public function store(Request $request){
        $admin = Admin::create([
            'EMAIL' => $request->email,
            'PASSWORD' => Hash::make($request->password),
        ]);
        return response()->json($admin);
    }

    public function destroy($id) {
        $admin = Admin::findOrFail($id);

        $admin->delete();

        return response()->json(['Message' => 'Deleted']);
    }
}
