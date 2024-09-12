<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('ratings_feedback', function (Blueprint $table) {
            $table->id();
            $table->text('FEEDBACK');
            $table->integer('RATING');
            $table->timestamp('FEEDBACK_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('ORDER_ID')->constrained('orders');
            $table->foreignId('USER_ID')->constrained('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ratings_feedback');
    }
};
