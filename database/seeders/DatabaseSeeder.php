<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Sin datos de prueba — todo el contenido se crea desde el panel admin.
        $this->call(TourSeeder::class);
    }
}
