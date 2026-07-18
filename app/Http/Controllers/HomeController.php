<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use App\Models\PreguntaFrecuente;
use App\Models\Testimonio;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Home', [
            'noticias'    => Noticia::publicadas()
                                ->latest('publicado_en')
                                ->limit(3)
                                ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'publicado_en', 'categoria']),
            'testimonios' => Testimonio::activos()->get(['id', 'nombre', 'cargo', 'texto']),
            'preguntas'   => PreguntaFrecuente::activas()->get(['id', 'pregunta', 'respuesta']),
        ]);
    }
}

