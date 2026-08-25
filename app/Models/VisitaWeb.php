<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class VisitaWeb extends Model
{
    protected $table = 'visitas_web';

    protected $fillable = [
        'ruta',
        'ip_hash',
        'dispositivo',
        'navegador',
        'referente',
        'session_id',
    ];

    public static function registrar(Request $request): ?self
    {
        $path = '/' . ltrim($request->path(), '/');
        $adminPath = config('admin.path', 'sih-panel-308');

        // Ignorar rutas administrativas, internas, devtools y estáticos
        if (
            str_starts_with($path, '/' . $adminPath) ||
            str_starts_with($path, '/@') ||
            str_starts_with($path, '/build') ||
            str_starts_with($path, '/storage') ||
            str_starts_with($path, '/.well-known') ||
            str_starts_with($path, '/vendor') ||
            str_ends_with($path, '.json') ||
            str_ends_with($path, '.svg') ||
            str_ends_with($path, '.png') ||
            str_ends_with($path, '.jpg') ||
            str_ends_with($path, '.css') ||
            str_ends_with($path, '.js')
        ) {
            return null;
        }

        $userAgent = $request->userAgent() ?? '';
        
        // Detección simple y veloz de dispositivo
        $dispositivo = 'desktop';
        if (preg_match('/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i', $userAgent)) {
            $dispositivo = 'tablet';
        } elseif (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile|iphone|ipod)/i', $userAgent)) {
            $dispositivo = 'mobile';
        }

        // Detección rápida de navegador
        $navegador = 'Otro';
        if (stripos($userAgent, 'Chrome') !== false && stripos($userAgent, 'Edg') === false) {
            $navegador = 'Chrome';
        } elseif (stripos($userAgent, 'Safari') !== false && stripos($userAgent, 'Chrome') === false) {
            $navegador = 'Safari';
        } elseif (stripos($userAgent, 'Firefox') !== false) {
            $navegador = 'Firefox';
        } elseif (stripos($userAgent, 'Edg') !== false) {
            $navegador = 'Edge';
        }

        $ip = $request->ip() ?? '127.0.0.1';
        $ipHash = hash('sha256', $ip . config('app.key'));
        $referente = $request->header('referer');

        try {
            return self::create([
                'ruta'        => substr($path, 0, 250),
                'ip_hash'     => $ipHash,
                'dispositivo' => $dispositivo,
                'navegador'   => $navegador,
                'referente'   => $referente ? substr($referente, 0, 250) : null,
                'session_id'  => $request->hasSession() ? substr($request->session()->getId(), 0, 95) : null,
            ]);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
