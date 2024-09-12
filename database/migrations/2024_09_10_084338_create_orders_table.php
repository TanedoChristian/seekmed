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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('TOTAL_AMOUNT', 10, 2);
            $table->timestamp('ORDER_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('PAYMENT_METHOD', 20);
            $table->decimal('PRICE', 10, 2);
            $table->string('STATUS', 20)->default('PENDING');
            $table->foreignId('USER_ID');
            $table->foreignId('ADMIN_ID');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
