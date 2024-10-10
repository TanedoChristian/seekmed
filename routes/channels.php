<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('chat-channel', function ($user) {
    return true; // Allow all authenticated users
    // If you need specific user validation, modify this return statement
    // For example: return $user->hasPermission('chat');
});
