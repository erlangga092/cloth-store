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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->restrictOnDelete();
            $table->foreignId('product_id')->references('id')->on('products')->restrictOnDelete();
            $table->string('product_image');
            $table->string('color');
            $table->string('color_image');
            $table->string('size');
            $table->bigInteger('price');
            $table->integer('qty');
            $table->integer('weight');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
