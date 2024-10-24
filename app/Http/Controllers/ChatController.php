<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        try {
            $message = $request->input('message');
            $user = $request->input('user');
            $channelId = $request->input('channelId', 'default');
            $status = $request->input('status');

            $pusher = new Pusher(
                '0f60d240a7e37c6b2818',
                '7e581cbd1c107cd7cdb4',
                '1874365',
                [
                    'cluster' => 'ap1',
                    'useTLS' => true
                ]
            );

            $channelName = "chat-channel-{$channelId}";

            $pusher->trigger($channelName, 'my-event', [
                'message' => $message,
                'user' => $user,
                'channelId' => $channelId,
                'status' => isset($status) ? $status : 'pending'

            ]);



            return response()->json([
                'status' => 'Message sent!',
                'channel' => $channelName
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
