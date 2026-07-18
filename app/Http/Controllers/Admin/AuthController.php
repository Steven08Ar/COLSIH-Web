<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $key = 'admin-login:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->withErrors([
                'usuario' => "Demasiados intentos. Intenta en {$seconds} segundos.",
            ]);
        }

        $request->validate([
            'usuario' => 'required|string',
            'password' => 'required|string',
        ]);

        $validUser  = hash_equals(env('ADMIN_USUARIO', ''), $request->usuario);
        $validPass  = hash_equals(env('ADMIN_CLAVE', ''),   $request->password);

        if ($validUser && $validPass) {
            RateLimiter::clear($key);
            $request->session()->regenerate();
            $request->session()->put('colsih_admin_auth', true);

            $adminPath = env('ADMIN_PATH', 'panel-admin');
            return redirect("/{$adminPath}");
        }

        RateLimiter::hit($key, 60);

        return back()->withErrors(['usuario' => 'Credenciales incorrectas.']);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('colsih_admin_auth');
        $adminPath = env('ADMIN_PATH', 'panel-admin');
        return redirect("/{$adminPath}/login");
    }
}
