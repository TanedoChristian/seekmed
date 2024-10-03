<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove the 'name' column
            $table->dropColumn('name');

            // Add 'first_name' and 'last_name' columns
            $table->string('first_name')->after('id'); // Adjust position as needed
            $table->string('last_name')->after('first_name');
            $table->string('address');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Re-add the 'name' column if rolling back
            $table->string('name')->after('id'); // Adjust position as needed

            // Drop 'first_name' and 'last_name' columns
            $table->dropColumn(['first_name', 'last_name']);
        });
    }
}
