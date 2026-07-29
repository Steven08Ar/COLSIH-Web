<?php

namespace Database\Seeders;

use App\Models\Hotspot;
use App\Models\Scene;
use App\Models\Tour;
use Illuminate\Database\Seeder;

class TourSeeder extends Seeder
{
    public function run(): void
    {
        if (Tour::where('slug', 'colsih')->exists()) {
            $this->command->warn('TourSeeder: el tour "colsih" ya existe, se omite.');
            return;
        }

        // ── Tour principal ────────────────────────────────────────────────────
        $tour = Tour::create([
            'nombre'      => 'Recorrido Virtual COLSIH',
            'slug'        => 'colsih',
            'descripcion' => 'Recorre nuestras instalaciones desde donde estés: patios, aulas, capilla y más.',
            'activo'      => true,
        ]);

        // ── Escenas ───────────────────────────────────────────────────────────
        // imagen_path = ruta relativa a storage/app/public/ (generada por tour:optimize-images)
        // Para pruebas sin imágenes reales, apunta a un placeholder.
        $entrada = Scene::create([
            'tour_id'          => $tour->id,
            'nombre'           => 'Entrada Principal',
            'slug'             => 'entrada-principal',
            'imagen_path'      => 'tours/demo/entrada.jpg',
            'yaw_inicial'      => 0,
            'pitch_inicial'    => 0,
            'hfov_inicial'     => 100,
            'es_escena_inicial'=> true,
            'orden'            => 1,
        ]);

        $patio = Scene::create([
            'tour_id'          => $tour->id,
            'nombre'           => 'Patio Central',
            'slug'             => 'patio-central',
            'imagen_path'      => 'tours/demo/patio.jpg',
            'yaw_inicial'      => -30,
            'pitch_inicial'    => 0,
            'hfov_inicial'     => 100,
            'es_escena_inicial'=> false,
            'orden'            => 2,
        ]);

        $biblioteca = Scene::create([
            'tour_id'          => $tour->id,
            'nombre'           => 'Biblioteca',
            'slug'             => 'biblioteca',
            'imagen_path'      => 'tours/demo/biblioteca.jpg',
            'yaw_inicial'      => 90,
            'pitch_inicial'    => -5,
            'hfov_inicial'     => 100,
            'es_escena_inicial'=> false,
            'orden'            => 3,
        ]);

        // ── Hotspots ──────────────────────────────────────────────────────────
        // Desde Entrada → Patio
        Hotspot::create([
            'scene_id'         => $entrada->id,
            'tipo'             => 'enlace',
            'yaw'              => 45.0,
            'pitch'            => -10.0,
            'texto'            => 'Ir al Patio Central',
            'scene_destino_id' => $patio->id,
        ]);

        // Info en Entrada
        Hotspot::create([
            'scene_id'         => $entrada->id,
            'tipo'             => 'info',
            'yaw'              => -60.0,
            'pitch'            => 5.0,
            'texto'            => 'Fundado en 1983 por la comunidad salesiana',
            'scene_destino_id' => null,
        ]);

        // Desde Patio → Biblioteca
        Hotspot::create([
            'scene_id'         => $patio->id,
            'tipo'             => 'enlace',
            'yaw'              => 120.0,
            'pitch'            => -8.0,
            'texto'            => 'Ir a la Biblioteca',
            'scene_destino_id' => $biblioteca->id,
        ]);

        // Desde Patio → Entrada
        Hotspot::create([
            'scene_id'         => $patio->id,
            'tipo'             => 'enlace',
            'yaw'              => -150.0,
            'pitch'            => -5.0,
            'texto'            => 'Volver a Entrada',
            'scene_destino_id' => $entrada->id,
        ]);

        // Desde Biblioteca → Patio
        Hotspot::create([
            'scene_id'         => $biblioteca->id,
            'tipo'             => 'enlace',
            'yaw'              => -90.0,
            'pitch'            => -10.0,
            'texto'            => 'Volver al Patio',
            'scene_destino_id' => $patio->id,
        ]);

        $this->command->info("Tour '{$tour->nombre}' creado con 3 escenas y 5 hotspots.");
    }
}
