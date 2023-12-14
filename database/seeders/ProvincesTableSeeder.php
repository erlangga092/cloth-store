<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class ProvincesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = Http::withHeaders([
            'key' => config('rajaongkir.api_key')
        ])->get('https://api.rajaongkir.com/starter/province');

        foreach ($response['rajaongkir']['results'] as $province) {
            Province::create([
                'id' => $province['province_id'],
                'name' => $province['province']
            ]);
        }
    }
}
