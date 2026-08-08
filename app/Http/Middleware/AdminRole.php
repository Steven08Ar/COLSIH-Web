<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRole
{
    /**
     * Verifica que el usuario tenga uno de los roles permitidos.
     * superenv siempre tiene acceso.
     * Uso en rutas: ->middleware('admin.rol:admin,deportes')
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $tipo = $request->session()->get('colsih_admin_tipo');

        if ($tipo === 'superenv') {
            return $next($request);
        }

        $rol = $request->session()->get('colsih_admin_rol');

        if ($rol && in_array($rol, $roles, true)) {
            return $next($request);
        }

        abort(403, 'No tienes permiso para acceder a esta sección.');
    }
}
