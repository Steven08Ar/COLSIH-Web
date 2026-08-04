<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    public function kiosco(Request $request)
    {
        $hasKioskAuth = $request->session()->get('colsih_kiosk_auth');
        $hasAdminAuth = $request->session()->get('colsih_admin_auth');

        if (!$hasKioskAuth && !$hasAdminAuth) {
            $adminPath = env('ADMIN_PATH', 'panel-admin');
            return redirect("/{$adminPath}/login");
        }

        $adminPath = env('ADMIN_PATH', 'panel-admin');

        return Inertia::render('Admin/CarnetsKiosco', [
            'isOnlyKiosk' => !$hasAdminAuth,
            'salirUrl' => "/{$adminPath}/carnets/salir",
            'adminDashboardUrl' => "/{$adminPath}",
        ]);
    }

    /**
     * Cierra el modo Kiosco y regresa al login.
     */
    public function salir(Request $request)
    {
        $request->session()->forget('colsih_kiosk_auth');
        $adminPath = env('ADMIN_PATH', 'panel-admin');
        return redirect("/{$adminPath}/login");
    }
}
