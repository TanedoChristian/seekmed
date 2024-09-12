<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnItem extends Model
{
    use HasFactory;

    protected $table = 'returns';

    protected $fillable = [
        'QUANTITY',
        'REASON',
        'RETURN_DATE',
        'ORDER_ID',
        'PRODUCT_ID',
    ];
}
