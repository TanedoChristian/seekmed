<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function createAdmin(): Response
    {
        return Inertia::render('Auth/LoginAdmin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function riderLogin(): Response
    {
        return Inertia::render('Auth/RiderLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }


    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();
        $cart = Cart::where('user_id', Auth::id())->first();

        if (!$cart) {
            Cart::create([
                'user_id' => Auth::id(),
                'status' => 'pending'
            ]);
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }


    public function storeRider(Request $request): RedirectResponse
{
    $credentials = $request->validate([
        'EMAIL' => ['required'],  // Changed from 'email' to 'EMAIL'
        'password' => ['required'],
    ]);

    if (Auth::guard('rider')->attempt($credentials)) {
        $request->session()->regenerate();

        return redirect()->intended(route('rider.dashboard'));
    }

    return back()
        ->withInput($request->only('EMAIL'))  // Changed from 'email' to 'EMAIL'
        ->withErrors([
            'EMAIL' => 'The provided credentials do not match our records.',  // Changed error key
        ]);
}



    public function storeAdmin(LoginRequest $request): RedirectResponse
    {
        // $request->authenticate();

        // $request->session()->regenerate();

        return redirect()->intended(route('admin/dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        Auth::guard('rider')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    public function destroyRider(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        Auth::guard('rider')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('rider/login');
    }
}
