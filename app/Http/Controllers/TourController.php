<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Inertia\Inertia;
use Inertia\Response;

class TourController extends Controller
{
    /**
     * Carga el tour completo (con escenas y hotspots) y lo pasa como prop
     * inicial a React vía Inertia — los datos se embeben como JSON en el
     * HTML inicial, sin ninguna llamada fetch al servidor.
     *
     * El shape que recibe el componente React (Tours/Show.jsx):
     * {
     *   tour: {
     *     id, nombre, slug, descripcion,
     *     scenes: [
     *       {
     *         id, nombre, slug, imagen_path, imagen_url,
     *         yaw_inicial, pitch_inicial, hfov_inicial, es_escena_inicial, orden,
     *         hotspots: [
     *           { id, tipo, yaw, pitch, texto, scene_destino_id }
     *         ]
     *       }
     *     ]
     *   }
     * }
     */
    public function show(?string $slug = 'colsih'): Response
    {
        $tour = Tour::with([
            'scenes' => fn ($q) => $q->with('hotspots'),
        ])
        ->where('slug', $slug)
        ->where('activo', true)
        ->first();

        return Inertia::render('Tours/Show', [
            'tour' => $tour,
        ]);
    }
}
