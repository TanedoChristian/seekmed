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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('AMOUNT', 10, 2);
            $table->timestamp('PAYMENT_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('PAYMENT_METHOD', 50);
            $table->foreignId('ORDER_ID')->constrained('orders');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
};
