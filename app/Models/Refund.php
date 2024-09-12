<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;

    protected $table = 'refunds';

    protected $fillable = [
        'AMOUNT',
        'REFUND_DATE',
        'RETURN_ID',
        'ADMIN_ID',
    ];
}
