<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class OfertaAcademicaController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('OfertaAcademica');
    }
}

