<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NoticiasController extends Controller
{
    public function index(Request $request): Response
    {
        $categoria = $request->get('categoria');
        $seccion   = $request->get('seccion');

        $noticias = Noticia::publicadas()
            ->when($categoria === 'deportes' || $seccion === 'deportes', function ($q) {
                $q->where(function ($sub) {
                    $sub->where('es_deporte', true)
                        ->orWhere('seccion', 'deportes');
                });
            })
            ->when($categoria && $categoria !== 'deportes', function ($q) use ($categoria) {
                $q->where('categoria', $categoria);
            })
            ->when($seccion && $seccion !== 'deportes', function ($q) use ($seccion) {
                $q->where('seccion', $seccion);
            })
            ->latest('publicado_en')
            ->paginate(9, ['id', 'titulo', 'slug', 'resumen', 'imagen', 'publicado_en', 'categoria', 'seccion', 'es_deporte']);

        return Inertia::render('Noticias/Index', [
            'noticias'          => $noticias,
            'categoriaActual'   => $categoria,
            'seccionActual'     => $seccion,
        ]);
    }

    public function show(Noticia $noticia): Response
    {
        abort_unless($noticia->activo, 404);

        $noticia->increment('vistas');

        $relacionadas = Noticia::publicadas()
            ->where('id', '!=', $noticia->id)
            ->where('categoria', $noticia->categoria)
            ->latest('publicado_en')
            ->limit(3)
            ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'publicado_en']);

        return Inertia::render('Noticias/Show', [
            'noticia'     => $noticia,
            'relacionadas' => $relacionadas,
        ]);
    }
}

