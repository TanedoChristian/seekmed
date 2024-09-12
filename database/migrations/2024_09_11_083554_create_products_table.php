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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('PRODUCT_NAME', 150);
            $table->string('DESCRIPTION', 255);
            $table->integer('STOCK_QUANTITY');
            $table->decimal('PRICE', 10, 2);
            $table->integer('TOTAL_INVENTORY');
            $table->boolean('IS_WHOLESALE');
            $table->date('EXPIRY_DATE');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
