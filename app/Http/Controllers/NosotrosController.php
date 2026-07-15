<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class NosotrosController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Nosotros/Index');
    }

    public function historia(): Response
    {
        return Inertia::render('Nosotros/Historia');
    }

    public function misionVision(): Response
    {
        return Inertia::render('Nosotros/MisionVision');
    }

    public function valores(): Response
    {
        return Inertia::render('Nosotros/Valores');
    }

    public function equipo(): Response
    {
        return Inertia::render('Nosotros/Equipo');
    }
}

