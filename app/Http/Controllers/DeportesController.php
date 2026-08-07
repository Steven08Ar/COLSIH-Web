<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Inertia\Inertia;
use Inertia\Response;

class DeportesController extends Controller
{
    public function index(): Response
    {
        $noticiasDeportivas = Noticia::publicadas()
            ->where('es_deporte', true)
            ->latest()
            ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'categoria', 'seccion', 'publicado_en']);

        return Inertia::render('Deportes', [
            'noticias' => $noticiasDeportivas,
        ]);
    }
}
