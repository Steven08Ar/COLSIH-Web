<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Controlador del Sistema de Carnets y Control de Ingreso (Kiosco en tiempo real).
 */
class CarnetsController extends Controller
{
    /**
     * Renderiza la vista de Kiosco de Registro de Asistencia.
     */
    public function kiosco(): Response
    {
        return Inertia::render('Admin/CarnetsKiosco');
    }
}
