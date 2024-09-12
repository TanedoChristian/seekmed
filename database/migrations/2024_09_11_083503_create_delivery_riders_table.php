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
        Schema::create('delivery_riders', function (Blueprint $table) {
            $table->id();
            $table->string('FNAME', 50);
            $table->string('LNAME', 50);
            $table->string('EMAIL', 100);
            $table->string('PASSWORD', 50);
            $table->string('CONTACTNO', 11);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('delivery_riders');
    }
};
