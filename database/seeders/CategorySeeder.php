<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 1000; $i++) {
            $name = 'Category ' . $i;
            $slug = Str::slug($name, '-');
            $image = 'https://via.placeholder.com/150'; // Ganti URL gambar sesuai kebutuhan

            DB::table('categories')->insert([
                'name' => $name,
                'slug' => $slug,
                'image' => $image,
            ]);
        }
    }
}
