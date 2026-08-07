<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\DeportesAdminController;
use App\Models\DeporteCarrusel;
use App\Models\Noticia;
use App\Models\TorneoPartido;
use Inertia\Inertia;
use Inertia\Response;

class DeportesController extends Controller
{
    public function index(): Response
    {
        DeportesAdminController::seedDefaultMatchesIfNeeded();

        $noticiasDeportivas = Noticia::publicadas()
            ->where('es_deporte', true)
            ->latest()
            ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'categoria', 'seccion', 'publicado_en']);

        $torneoPartidos = TorneoPartido::orderBy('id')->get();
        $deportesBanners = DeporteCarrusel::where('activo', true)->orderBy('orden')->get();

        return Inertia::render('Deportes', [
            'noticias'        => $noticiasDeportivas,
            'torneoPartidos'  => $torneoPartidos,
            'deportesBanners' => $deportesBanners,
        ]);
    }
}
