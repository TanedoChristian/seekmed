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
            //

            $table->dropForeign(['order_id']); // Adjust this if your foreign key is named differently
            // Now drop the product_id column
            $table->dropColumn('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ratings_feedback', function (Blueprint $table) {
            //
        });
    }
};
