<?php

namespace App\Http\Controllers;

use App\Models\EquipoMember;
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

        $nombresPreescolar = [
            'Daniela Villamizar Villamizar',
            'Lady Diana Osorio Fonseca',
            'Paula Lorena Cuadros Ballesteros',
            'Diana Soidé Villamizar Bautista',
        ];

        $docentesPreescolar = EquipoMember::where('activo', true)
            ->whereIn('nombre', $nombresPreescolar)
            ->get(['id', 'nombre', 'cargo', 'foto', 'foto_posicion', 'foto_posicion_x', 'foto_posicion_y', 'foto_zoom'])
            ->sortBy(fn($m) => array_search($m->nombre, $nombresPreescolar))
            ->values();

        return Inertia::render('OfertaAcademica/Preescolar', [
            'noticias'           => $noticias,
            'docentesPreescolar' => $docentesPreescolar,
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
