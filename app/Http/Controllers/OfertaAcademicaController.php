<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Inertia\Inertia;
use Inertia\Response;

class OfertaAcademicaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('OfertaAcademica');
    }

    public function preescolar(): Response
    {
        $noticias = Noticia::where('activo', true)
            ->where('categoria', 'preescolar')
            ->latest('publicado_en')
            ->take(6)
            ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'categoria', 'publicado_en']);

        return Inertia::render('OfertaAcademica/Preescolar', [
            'noticias' => $noticias,
        ]);
    }

    public function primaria(): Response
    {
        return Inertia::render('OfertaAcademica/Primaria');
    }

    public function bachillerato(): Response
    {
        return Inertia::render('OfertaAcademica/Bachillerato');
    }

    public function sena(): Response
    {
        return Inertia::render('OfertaAcademica/Sena');
    }
}
