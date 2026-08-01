<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Scene;
use App\Models\Tour;
use App\Services\ImageOptimizer;
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
     * Agrega una nueva imagen/escena 360° al tour
     */
    public function storeScene(Request $request)
    {
        $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'imagen' => ['required_without:imagen_url_manual', 'nullable', 'image', 'mimes:jpeg,jpg,png', 'max:51200'],
            'imagen_url_manual' => ['nullable', 'string'],
        ]);

        $tour = Tour::firstOrCreate(['slug' => 'colsih'], ['nombre' => 'Recorrido Virtual 360°']);

        $imagenPath = null;

        if ($request->hasFile('imagen')) {
            $imagenPath = ImageOptimizer::guardar($request->file('imagen'), 'recorrido_virtual', ImageOptimizer::LADO_360);
        } elseif ($request->filled('imagen_url_manual')) {
            $imagenPath = ltrim($request->imagen_url_manual, '/storage/');
        }

        if (!$imagenPath) {
            return back()->with('flash', 'Debe adjuntar una imagen 360° o especificar la ruta del archivo.');
        }

        $baseSlug = Str::slug($request->nombre);
        $slug = $baseSlug;
        if (Scene::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . Str::random(4);
        }

        $esPrimera = $tour->scenes()->count() === 0;

        $scene = $tour->scenes()->create([
            'nombre' => $request->nombre,
            'slug' => $slug,
            'imagen_path' => $imagenPath,
            'yaw_inicial' => 0,
            'pitch_inicial' => 0,
            'hfov_inicial' => 100,
            'es_escena_inicial' => $esPrimera,
            'orden' => $tour->scenes()->count() + 1,
        ]);

        return back()->with('flash', 'Escena 360° agregada exitosamente.');
    }

    /**
     * Carga en masa de escenas 360° (Hasta 50 imágenes a la vez).
     */
    public function storeBatchScenes(Request $request): RedirectResponse
    {
        $request->validate([
            'escenas' => ['required', 'array', 'min:1', 'max:50'],
            'escenas.*.nombre' => ['required', 'string', 'max:255'],
            'escenas.*.imagen' => ['required', 'image', 'mimes:jpeg,jpg,png', 'max:51200'],
        ]);

        $tour = Tour::firstOrCreate(['slug' => 'colsih'], ['nombre' => 'Recorrido Virtual 360°']);
        $currentCount = $tour->scenes()->count();
        $savedCount = 0;

        foreach ($request->file('escenas') as $index => $item) {
            if (isset($item['imagen']) && $item['imagen']->isValid()) {
                $nombre = $request->input("escenas.{$index}.nombre") ?: ('Espacio ' . ($currentCount + $savedCount + 1));
                $imagenPath = ImageOptimizer::guardar($item['imagen'], 'recorrido_virtual', ImageOptimizer::LADO_360);
                
                $baseSlug = Str::slug($nombre);
                $slug = $baseSlug;
                if (Scene::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . Str::random(4);
                }

                $esPrimera = ($currentCount + $savedCount) === 0;

                $tour->scenes()->create([
                    'nombre' => $nombre,
                    'slug' => $slug,
                    'imagen_path' => $imagenPath,
                    'yaw_inicial' => 0,
                    'pitch_inicial' => 0,
                    'hfov_inicial' => 100,
                    'es_escena_inicial' => $esPrimera,
                    'orden' => $currentCount + $savedCount + 1,
                ]);

                $savedCount++;
            }
        }

        return back()->with('flash', "¡Se agregaron {$savedCount} escenas 360° en masa exitosamente!");
    }

    /**
     * Establece una escena específica como la imagen principal del recorrido 360°.
     */
    public function setInitialScene(Scene $scene): RedirectResponse
    {
        Scene::where('tour_id', $scene->tour_id)->update(['es_escena_inicial' => false]);
        $scene->update(['es_escena_inicial' => true]);

        return back()->with('flash', "¡'{$scene->nombre}' fue configurada como la imagen principal del recorrido 360°!");
    }

    /**
     * Actualiza la escena (por ejemplo, vista y zoom iniciales de cámara).
     */
    public function updateScene(Request $request, Scene $scene): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['nullable', 'string', 'max:255'],
            'yaw_inicial' => ['nullable', 'numeric'],
            'pitch_inicial' => ['nullable', 'numeric'],
            'hfov_inicial' => ['nullable', 'numeric'],
            'es_escena_inicial' => ['nullable', 'boolean'],
        ]);

        if (!empty($validated['es_escena_inicial'])) {
            Scene::where('tour_id', $scene->tour_id)->update(['es_escena_inicial' => false]);
        }

        $scene->update(array_filter($validated, fn($val) => !is_null($val)));

        return back()->with('flash', '¡Configuración de la escena guardada exitosamente!');
    }

    /**
     * Elimina una escena.
     */
    public function destroyScene(Scene $scene): RedirectResponse
    {
        $scene->delete();

        return back()->with('flash', 'Escena eliminada correctamente.');
    }
}
