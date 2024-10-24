<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ratings extends Model
{
    use HasFactory;

    protected $table = 'ratings_feedback';

    protected $fillable = [
        'FEEDBACK',
        'RATING',
        'FEEDBACK_DATE',
        'product_id',
        'USER_ID',
    ];
}
