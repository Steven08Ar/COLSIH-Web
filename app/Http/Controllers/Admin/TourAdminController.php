<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Scene;
use App\Models\Tour;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TourAdminController extends Controller
{
    /**
     * Muestra el módulo de gestión del Recorrido 360° en el Panel Admin.
     */
    public function index(): Response
    {
        $tour = Tour::firstOrCreate(
            ['slug' => 'colsih'],
            [
                'nombre' => 'Recorrido Virtual 360° COLSIH',
                'descripcion' => 'Tour virtual interactivo de las instalaciones del Colegio Santa Isabel de Hungría.',
                'activo' => true,
            ]
        );

        // Si el tour no tiene escenas guardadas aún, autogeneramos las escenas iniciales desde las imágenes disponibles
        if ($tour->scenes()->count() === 0) {
            $this->seedInitialScenes($tour);
        }

        $scenes = $tour->scenes()->with('hotspots')->get();

        return Inertia::render('Admin/Dashboard', [
            'seccion' => 'recorrido',
            'tour' => $tour,
            'scenes' => $scenes,
            'testimonios' => \App\Models\Testimonio::latest()->get(),
            'noticias' => \App\Models\Noticia::latest()->get(),
            'preguntas' => \App\Models\PreguntaFrecuente::orderBy('orden')->get(),
            'flash' => session('flash'),
        ]);
    }

    /**
     * Carga el Editor Visual de Hotspots 360° para una escena específica.
     */
    public function editor(Scene $scene): Response
    {
        $scene->load('hotspots');
        $tour = $scene->tour;
        $allScenes = Scene::where('tour_id', $tour->id)->get();

        return Inertia::render('Admin/HotspotEditor', [
            'tour' => $tour,
            'scene' => $scene,
            'hotspots' => $scene->hotspots,
            'allScenes' => $allScenes,
            'flash' => session('flash'),
        ]);
    }

    /**
     * Agrega una nueva imagen/escena 360° al tour.
     */
    public function storeScene(Request $request): RedirectResponse
    {
        $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'imagen' => ['required_without:imagen_url_manual', 'nullable', 'image', 'mimes:jpeg,jpg,png', 'max:20480'],
            'imagen_url_manual' => ['nullable', 'string'],
        ]);

        $tour = Tour::firstOrCreate(['slug' => 'colsih'], ['nombre' => 'Recorrido Virtual 360°']);

        $imagenPath = null;

        if ($request->hasFile('imagen')) {
            $imagenPath = $request->file('imagen')->store('recorrido_virtual', 'public');
        } elseif ($request->filled('imagen_url_manual')) {
            $imagenPath = ltrim($request->imagen_url_manual, '/storage/');
        }

        if (!$imagenPath) {
            return back()->with('flash', 'Debe adjuntar una imagen 360° o especificar la ruta del archivo.');
        }

        $slug = Str::slug($request->nombre);

        $tour->scenes()->create([
            'nombre' => $request->nombre,
            'slug' => $slug,
            'imagen_path' => $imagenPath,
            'yaw_inicial' => 0,
            'pitch_inicial' => 0,
            'hfov_inicial' => 100,
            'orden' => $tour->scenes()->count() + 1,
        ]);

        return back()->with('flash', 'Escena 360° agregada exitosamente.');
    }

    /**
     * Elimina una escena.
     */
    public function destroyScene(Scene $scene): RedirectResponse
    {
        $scene->delete();

        return back()->with('flash', 'Escena eliminada correctamente.');
    }

    /**
     * Helper interno para sembrar escenas iniciales del proyecto si la BD está vacía.
     */
    private function seedInitialScenes(Tour $tour): void
    {
        $defaultScenes = [
            ['nombre' => 'Entrada Principal', 'slug' => 'entrada', 'imagen_path' => 'recorrido_virtual/1.entrada.jpg', 'es_escena_inicial' => true],
            ['nombre' => 'Lobby de Bienvenida', 'slug' => 'lobby', 'imagen_path' => 'recorrido_virtual/2.lobby.jpg'],
            ['nombre' => 'Lobby Nivel Inferior', 'slug' => 'lobby-bajo', 'imagen_path' => 'recorrido_virtual/3.lobby_bajo.jpg'],
            ['nombre' => 'Pasillo Cafetería', 'slug' => 'pasillo-cafeteria', 'imagen_path' => 'recorrido_virtual/3.pasillo_cafeteria.jpg'],
            ['nombre' => 'Parque y Cafetería', 'slug' => 'cafeteria', 'imagen_path' => 'recorrido_virtual/4.parque_cafeteria.jpg'],
            ['nombre' => 'Capilla Institucional', 'slug' => 'capilla', 'imagen_path' => 'recorrido_virtual/5.capilla.jpg'],
            ['nombre' => 'Sala de Informática A', 'slug' => 'informatica-a', 'imagen_path' => 'recorrido_virtual/12.informatica_a.jpg'],
            ['nombre' => 'Sala de Informática B', 'slug' => 'informatica-b', 'imagen_path' => 'recorrido_virtual/13.informatica_b.jpg'],
            ['nombre' => 'Cancha Múltiple', 'slug' => 'cancha-pequena', 'imagen_path' => 'recorrido_virtual/18.cancha_pequeña.jpg'],
            ['nombre' => 'Coliseo Deportivo', 'slug' => 'cancha-grande', 'imagen_path' => 'recorrido_virtual/19.cancha_grande.jpg'],
            ['nombre' => 'Gimnasio Deportivo', 'slug' => 'gimnasio', 'imagen_path' => 'recorrido_virtual/34.gimnasio.jpg'],
            ['nombre' => 'Biblioteca Institucional', 'slug' => 'biblioteca', 'imagen_path' => 'recorrido_virtual/38.biblioteca.jpg'],
        ];

        foreach ($defaultScenes as $idx => $s) {
            $tour->scenes()->create([
                'nombre' => $s['nombre'],
                'slug' => $s['slug'],
                'imagen_path' => $s['imagen_path'],
                'es_escena_inicial' => $s['es_escena_inicial'] ?? false,
                'orden' => $idx + 1,
            ]);
        }
    }
}
