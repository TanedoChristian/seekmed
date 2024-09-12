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
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->timestamp('RECEIPT_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->decimal('TOTAL_AMOUNT', 10, 2);
            $table->foreignId('ORDER_ID')->constrained('orders');
            $table->foreignId('PAYMENT_ID')->constrained('payments');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('receipts');
    }
};
