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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->string('CHANGE_TYPE', 100);
            $table->integer('QUANTITY_CHANGE');
            $table->timestamp('CHANGE_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('PRODUCT_ID')->constrained('products');
            $table->foreignId('ADMIN_ID')->constrained('admins');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inventories');
    }
};
