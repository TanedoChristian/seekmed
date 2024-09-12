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
        Schema::create('returns', function (Blueprint $table) {
            $table->id();
            $table->integer('QUANTITY');
            $table->text('REASON');
            $table->timestamp('RETURN_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('ORDER_ID')->constrained('orders');
            $table->foreignId('PRODUCT_ID')->constrained('products');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('returns');
    }
};
