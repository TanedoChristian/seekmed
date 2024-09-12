<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';

    protected $fillable = [
        'READ_STATUS',
        'USER_ID',
        'RIDER_ID',
        'ADMIN_ID',
    ];
}
