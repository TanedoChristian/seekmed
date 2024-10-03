<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RiderController extends Controller
{
    public function index() {
        $orders = DB::select('SELECT users.address, carts.id, carts.status, concat(users.first_name, " ", users.last_name) as name from users inner join carts on carts.user_id = users.id where carts.status = "pending"');
        return Inertia::render(
            'Rider/Dashboard', [
                'orders' => $orders
            ]
        );
    }
}
