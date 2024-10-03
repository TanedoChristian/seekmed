<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing primary key 'id'
            $table->unsignedBigInteger('cart_id'); // Foreign key for cart
            $table->unsignedBigInteger('product_id'); // Foreign key for product
            $table->integer('quantity'); // Quantity of the product
            $table->decimal('price', 10, 2); // Price of the product
            $table->timestamps(); // Creates 'created_at' and 'updated_at' columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart_items'); // Drops the 'cart_items' table if it exists
    }
}