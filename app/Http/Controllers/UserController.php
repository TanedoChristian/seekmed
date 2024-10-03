<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index() {
        $user = Auth::user();
        return Inertia::render('Profile/Index', [
            'user' => $user,
        ]);
    }

    //
    public function update(Request $request, $id) {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'string',
            'contact_no' => 'string',
            'address' => 'string'
        ]);

        $user->update($validatedData);
        return response()->json($user);
    }
}
