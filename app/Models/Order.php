<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'TOTAL_AMOUNT',
        'ORDER_DATE',
        'PAYMENT_METHOD',
        'PRICE',
        'STATUS',
        'USER_ID',
        'ADMIN_ID',
    ];
}
