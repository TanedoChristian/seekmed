<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeCartIdToUserIdInCartItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cart_items', function (Blueprint $table) {
            $table->renameColumn('cart_id', 'user_id');
            $table->string('status')->default('pending')->after('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cart_items', function (Blueprint $table) {
            // Revert 'user_id' back to 'cart_id'
            $table->renameColumn('user_id', 'cart_id');

            // Drop the 'status' column
            $table->dropColumn('status');
        });
    }
}