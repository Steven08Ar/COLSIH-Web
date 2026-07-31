<?php

namespace App\Http\Controllers;

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
        return Inertia::render('OfertaAcademica/Preescolar');
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
