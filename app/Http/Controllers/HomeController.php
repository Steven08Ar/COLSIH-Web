<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $noticias = Noticia::publicadas()
            ->latest('publicado_en')
            ->limit(3)
            ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'publicado_en', 'categoria']);

        return Inertia::render('Home', [
            'noticias' => $noticias,
        ]);
    }
}

