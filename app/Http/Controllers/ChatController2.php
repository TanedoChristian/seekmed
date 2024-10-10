<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Pusher\Pusher;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
        $user = $request->input('user');

        $pusher = new Pusher(
            '0f60d240a7e37c6b2818',
            '7e581cbd1c107cd7cdb4',
            '1874365',
            [
                'cluster' => 'ap1',
                'useTLS' => true
            ]
        );

        $pusher->trigger('chat-channel', 'my-event', [
            'message' => $message,
            'user' => $user
        ]);

        return response()->json(['status' => 'Message sent!']);
    }
}
