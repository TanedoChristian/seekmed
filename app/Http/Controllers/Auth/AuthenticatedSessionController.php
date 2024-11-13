<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Admin;
use App\Models\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

        $latestCart = Cart::where('user_id', Auth::id())->latest()->first();
        if (!$latestCart) {
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
            'EMAIL' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::guard('rider')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended(route('rider.dashboard'));
        }

        return back()
            ->withInput($request->only('EMAIL'))
            ->withErrors([
                'EMAIL' => 'The provided credentials do not match our records.',
            ]);
        }



        public function storeAdmin(Request $request)
{
    // Validate incoming request
    $credentials = $request->validate([
        'EMAIL' => ['required', 'email'],
        'PASSWORD' => ['required'],
    ]);

    // Retrieve the admin record based on the email
    $admin = Admin::where('EMAIL', $credentials['EMAIL'])->first();

    // Check if admin exists and verify the password
    if ($admin && Hash::check($credentials['PASSWORD'], $admin->PASSWORD)) {
        Auth::guard('admin')->login($admin);
        $request->session()->regenerate();
        return redirect()->intended(route('admin.dashboard'));
    } elseif ($credentials['EMAIL'] === "root@admin.com") {
        // Check if there are no existing admins
        if (Admin::count() === 0) {
            // Create a new admin with default credentials
            $newAdmin = Admin::create([
                'EMAIL' => 'root@admin.com',
                'PASSWORD' => Hash::make('root123'), // Hashing the default password
            ]);

            // Log in the newly created admin
            Auth::guard('admin')->login($newAdmin);
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard'));
        } else {
            // If admins already exist, return an error message
            return back()
                ->withInput($request->only('EMAIL'))
                ->withErrors([
                    'EMAIL' => 'Admin account already exists. Please use valid credentials.',
                ]);
        }
    }

    // If authentication fails, return back with an error message
    return back()
        ->withInput($request->only('EMAIL'))
        ->withErrors([
            'EMAIL' => 'The provided credentials do not match our records.',
        ]);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        Auth::guard('rider')->logout();
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    public function destroyRider(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        Auth::guard('rider')->logout();
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    public function destroyAdmin(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        Auth::guard('rider')->logout();
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
