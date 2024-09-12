<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    use HasFactory;

    protected $table = 'order_history';

    protected $fillable = [
        'PAYMENT_ID',
        'ORDER_ID',
        'DELIVERY_ID',
        'RIDER_ID',
        'ADMIN_ID',
    ];
}
