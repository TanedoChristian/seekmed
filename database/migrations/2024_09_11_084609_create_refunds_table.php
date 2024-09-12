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
        Schema::create('refunds', function (Blueprint $table) {
            $table->id();
            $table->decimal('AMOUNT', 10, 2);
            $table->timestamp('REFUND_DATE')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('RETURN_ID')->constrained('returns');
            $table->foreignId('ADMIN_ID')->constrained('admins');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('refunds');
    }
};
