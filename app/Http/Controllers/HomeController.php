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
        $tour = Tour::firstOrCreate(
            ['slug' => 'colsih'],
            ['nombre' => 'Recorrido Virtual 360° COLSIH', 'activo' => true]
        );

        $tour->load(['scenes' => function ($q) {
            $q->orderBy('orden')->with('hotspots');
        }]);

        $scenes = $tour->scenes;

        $testimonios = Testimonio::activos()->get(['id', 'nombre', 'cargo', 'texto', 'imagen', 'foto_posicion', 'video_url', 'video_activo']);
        
        // Incrementar contador de visualizaciones de testimonios mostrados
        if ($testimonios->isNotEmpty()) {
            Testimonio::whereIn('id', $testimonios->pluck('id'))->increment('vistas');
        }

        return Inertia::render('Home', [
            'tour'        => $tour,
            'scenes'      => $scenes,
            'noticias'    => Noticia::publicadas()
                                ->latest('publicado_en')
                                ->limit(3)
                                ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'publicado_en', 'categoria']),
            'testimonios' => $testimonios,
            'preguntas'   => PreguntaFrecuente::activas()->get(['id', 'pregunta', 'respuesta']),
        ]);
    }
}
