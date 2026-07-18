<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->get('colsih_admin_auth')) {
            $adminPath = env('ADMIN_PATH', 'panel-admin');
            return redirect("/{$adminPath}/login");
        }

        return $next($request);
    }
}
