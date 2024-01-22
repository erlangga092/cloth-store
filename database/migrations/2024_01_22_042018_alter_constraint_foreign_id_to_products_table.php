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
            'alter table products drop constraint products_category_id_foreign,
            add constraint products_category_id_foreign
            foreign key (category_id)
            references categories(id)
            on delete cascade;'
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement(
            'alter table products drop constraint products_category_id_foreign,
            add constraint products_category_id_foreign
            foreign key (category_id)
            references categories(id);'
        );
    }
};
