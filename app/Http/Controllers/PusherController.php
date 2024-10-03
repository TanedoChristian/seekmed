<?php

namespace App\Http\Controllers;

use App\Events\PusherBroadcast;
use Illuminate\Http\Request;

class PusherController extends Controller
{
    //

    public function index(){}
    public function broadcast(Request $request) {

        broadcast(new PusherBroadcast($request->message()))->toOthers();

        return response()->json(['message' =>  $request->message()]);
    }
    public function receive() {}
}
