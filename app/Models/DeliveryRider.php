<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryRider extends Model
{
    use HasFactory;

    protected $table = 'delivery_riders';

    protected $fillable = [
        'FNAME',
        'LNAME',
        'EMAIL',
        'PASSWORD',
        'CONTACTNO',
    ];
}
