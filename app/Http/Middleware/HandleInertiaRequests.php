<?php

namespace App\Http\Middleware;

use App\Models\AdminUser;
use App\Models\Noticia;
use App\Models\PreguntaFrecuente;
use App\Models\Scene;
use App\Models\Testimonio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'flash' => $request->session()->get('flash'),
            'adminSesion' => function () use ($request) {
                if (! $request->session()->get('colsih_admin_auth')) {
                    return null;
                }

                if ($request->session()->get('colsih_admin_tipo') === 'superenv') {
                    return [
                        'tipo'    => 'superenv',
                        'nombre'  => 'Super Admin',
                        'usuario' => config('admin.usuario'),
                        'foto'    => null,
                        'id'      => null,
                    ];
                }

                $userId = $request->session()->get('colsih_admin_user_id');
                if ($userId) {
                    $user = AdminUser::find($userId);
                    if ($user) {
                        $fotoUrl = null;
                        if ($user->foto) {
                            $fotoUrl = str_starts_with($user->foto, 'http')
                                ? $user->foto
                                : Storage::url($user->foto);
                        }
                        return [
                            'tipo'    => 'usuario',
                            'nombre'  => $user->nombre,
                            'usuario' => $user->usuario,
                            'foto'    => $fotoUrl,
                            'id'      => $user->id,
                        ];
                    }
                }

                return null;
            },
            'adminCounts' => function () use ($request) {
                $adminPath = config('admin.path');
                if (! str_starts_with($request->path(), $adminPath)) {
                    return null;
                }
                return [
                    'testimonios' => Testimonio::count(),
                    'noticias'    => Noticia::count(),
                    'preguntas'   => PreguntaFrecuente::count(),
                    'scenes'      => Scene::count(),
                ];
            },
        ];
    }
}
