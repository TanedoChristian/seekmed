<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Mail\Events\MessageSent;
use PhpAmqpLib\Connection\AMQPStreamConnection;

class ConsumeMessages extends Command
{
    protected $signature = 'rabbitmq:consume';
    protected $description = 'Consume messages from RabbitMQ';

    public function handle() {
        // Use 'rabbitmq' instead of 'localhost'
        $connection = new AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');
        $channel = $connection->channel();
        $channel->queue_declare('chat_queue', false, true, false, false, false, []);

        $callback = function ($msg) {
            event(new MessageSent(json_decode($msg->body)));
        };

        $channel->basic_consume('chat_queue', '', false, true, false, false, $callback);

        while ($channel->is_consuming()) {
            $channel->wait();
        }
    }
}
