<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventories';

    protected $fillable = [
        'CHANGE_TYPE',
        'QUANTITY_CHANGE',
        'CHANGE_DATE',
        'PRODUCT_ID',
        'ADMIN_ID',
    ];
}
