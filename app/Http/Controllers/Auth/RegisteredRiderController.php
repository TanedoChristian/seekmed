<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\DeliveryRider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredRiderController extends Controller
{
    /**
     * Display the rider registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/RiderRegister');
    }

    /**
     * Handle an incoming rider registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'FNAME' => 'required|string|max:50',
            'LNAME' => 'required|string|max:50',
            'EMAIL' => 'required|string|lowercase|email|max:100|unique:'.DeliveryRider::class,
            'password' => ['required', Rules\Password::defaults()],
            'CONTACTNO' => 'required|string|max:11',
        ]);

        $rider = DeliveryRider::create([
            'FNAME' => $request->FNAME,
            'LNAME' => $request->LNAME,
            'EMAIL' => $request->EMAIL,
            'password' => Hash::make($request->password),
            'CONTACTNO' => $request->CONTACTNO,
        ]);

        event(new Registered($rider));

        Auth::guard('rider')->login($rider);
        return redirect(route('rider.dashboard', absolute: false));
    }
}
