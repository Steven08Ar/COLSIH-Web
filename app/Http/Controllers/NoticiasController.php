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

        $noticias = Noticia::publicadas()
            ->when($categoria, fn ($q) => $q->where('categoria', $categoria))
            ->latest('publicado_en')
            ->paginate(9, ['id', 'titulo', 'slug', 'resumen', 'imagen', 'publicado_en', 'categoria']);

        return Inertia::render('Noticias/Index', [
            'noticias'          => $noticias,
            'categoriaActual'   => $categoria,
        ]);
    }

    public function show(Noticia $noticia): Response
    {
        abort_unless($noticia->activo, 404);

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

