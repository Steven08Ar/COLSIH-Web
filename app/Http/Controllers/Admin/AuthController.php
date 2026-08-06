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

        // 1. Inicio de sesión mediante PIN (EXCLUSIVO para Kiosco de Asistencia - NO otorga acceso al Panel Admin)
        if ($request->filled('pin')) {
            $adminPin = config('admin.pin');
            if (hash_equals((string)$adminPin, (string)$request->pin)) {
                RateLimiter::clear($key);
                $request->session()->regenerate();
                // Solo otorga acceso de lectura/escaneo al Kiosco de Asistencia
                $request->session()->put('colsih_kiosk_auth', true);

                $adminPath = config('admin.path');
                return redirect("/{$adminPath}/carnets");
            }

            RateLimiter::hit($key, 60);
            return back()->withErrors(['pin' => 'PIN de acceso al Kiosco incorrecto.']);
        }

        // 2. Inicio de sesión estándar (Usuario y Contraseña)
        $request->validate([
            'usuario' => 'required|string',
            'password' => 'required|string',
        ]);

        $validUser  = hash_equals(config('admin.usuario'), $request->usuario);
        $validPass  = hash_equals(config('admin.clave'),   $request->password);

        if ($validUser && $validPass) {
            RateLimiter::clear($key);
            $request->session()->regenerate();
            $request->session()->put('colsih_admin_auth', true);

            $adminPath = config('admin.path');
            return redirect("/{$adminPath}");
        }

        RateLimiter::hit($key, 60);

        return back()->withErrors(['usuario' => 'Credenciales incorrectas.']);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('colsih_admin_auth');
        $adminPath = config('admin.path');
        return redirect("/{$adminPath}/login");
    }
}
