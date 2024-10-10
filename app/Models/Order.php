<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'PAYMENT_METHOD',
        'STATUS',
        'USER_ID',
        'cart_id',
        'address',
        'contact_number'
    ];
}
