<?php

namespace App\Http\Middleware;

use App\Models\AdminUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $adminPath = config('admin.path');

        if (! $request->session()->get('colsih_admin_auth')) {
            return redirect("/{$adminPath}/login");
        }

        // Si es usuario de BD, verificar que siga activo en cada request
        if ($request->session()->get('colsih_admin_tipo') === 'usuario') {
            $userId = $request->session()->get('colsih_admin_user_id');
            $user   = AdminUser::find($userId);

            if (! $user || ! $user->activo) {
                $request->session()->forget(['colsih_admin_auth', 'colsih_admin_tipo', 'colsih_admin_user_id']);
                return redirect("/{$adminPath}/login")
                    ->withErrors(['usuario' => 'Tu cuenta ha sido desactivada.']);
            }
        }

        return $next($request);
    }
}
