<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ratings_feedback', function (Blueprint $table) {
            // Optionally, you can re-add the column and foreign key if needed
            $table->unsignedBigInteger('product_id')->nullable(); // Adjust as necessary

            // Add the foreign key back (assuming it references products table)
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
