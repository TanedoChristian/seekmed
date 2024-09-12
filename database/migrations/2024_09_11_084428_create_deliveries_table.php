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
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->timestamp('DELIVERY_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('DELIVERY_STATUS', 255);
            $table->foreignId('ORDER_ID')->constrained('orders');
            $table->foreignId('RIDER_ID')->constrained('delivery_riders');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
};
