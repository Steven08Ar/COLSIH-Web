<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use App\Models\PreguntaFrecuente;
use App\Models\Testimonio;
use App\Models\Tour;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $tour = Tour::with(['scenes' => function ($q) {
            $q->orderBy('orden')->with('hotspots');
        }])->where('slug', 'colsih')->first();

        $scenes = $tour ? $tour->scenes : [];

        return Inertia::render('Home', [
            'tour'        => $tour,
            'scenes'      => $scenes,
            'noticias'    => Noticia::publicadas()
                                ->latest('publicado_en')
                                ->limit(3)
                                ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'publicado_en', 'categoria']),
            'testimonios' => Testimonio::activos()->get(['id', 'nombre', 'cargo', 'texto', 'imagen', 'foto_posicion', 'video_url', 'video_activo']),
            'preguntas'   => PreguntaFrecuente::activas()->get(['id', 'pregunta', 'respuesta']),
        ]);
    }
}
