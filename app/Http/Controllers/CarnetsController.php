<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Controlador del Sistema de Carnets y Control de Ingreso.
 *
 * Estado: EN DESARROLLO — integración con el backend FastAPI en carnets/backend/
 * Por ahora el kiosco se sirve como página estática desde public/carnets/
 *
 * Integración futura:
 *  - Gestión de estudiantes desde el panel admin de Laravel
 *  - Autenticación antes de acceder al kiosco
 *  - Sincronización de estudiantes desde la base de datos MySQL principal
 */
class CarnetsController extends Controller
{
    /**
     * Redirige al kiosco estático (public/carnets/index.html).
     * En producción se reemplazará por una vista Inertia con auth.
     */
    public function kiosco()
    {
        return redirect('/carnets/index.html');
    }
}
