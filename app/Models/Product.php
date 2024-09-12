<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'PRODUCT_NAME',
        'DESCRIPTION',
        'STOCK_QUANTITY',
        'PRICE',
        'TOTAL_INVENTORY',
        'IS_WHOLESALE',
        'EXPIRY_DATE',
    ];
}
