<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('order_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('PAYMENT_ID')->constrained('payments');
            $table->foreignId('ORDER_ID')->constrained('orders');
            $table->foreignId('DELIVERY_ID')->constrained('deliveries');
            $table->foreignId('RIDER_ID')->constrained('delivery_riders');
            $table->foreignId('ADMIN_ID')->constrained('admins');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_history');
    }
};
