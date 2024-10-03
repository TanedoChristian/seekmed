<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class MessageController extends Controller
{
    public function store(Request $request) {
        $connection = new AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');

        $channel = $connection->channel();
        $channel->queue_declare('chat_queue', false, true, false, false,false, []);

        $message = new AMQPMessage($request->message);
        $channel->basic_publish($message, '', 'chat_queue');

        $channel->close();
        $connection->close();

        return response()->json($message, 201);
    }
}
