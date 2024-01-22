<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement(
            'alter table product_sizes drop constraint product_sizes_product_id_foreign,
            add constraint product_sizes_product_id_foreign
            foreign key (product_id)
            references products(id)
            on delete cascade;'
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement(
            'alter table product_sizes drop constraint product_sizes_product_id_foreign,
            add constraint product_sizes_product_id_foreign
            foreign key (product_id)
            references products(id);'
        );
    }
};
