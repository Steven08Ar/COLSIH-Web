<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NoticiaAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'seccion'      => 'noticias',
            'testimonios'  => [],
            'noticias'     => Noticia::latest()->get(),
            'preguntas'    => [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:400',
            'contenido'    => 'required|string',
            'categoria'    => 'required|in:noticia,evento,comunicado',
            'activo'       => 'boolean',
            'publicado_en' => 'nullable|date',
        ]);

        $data['slug'] = Str::slug($data['titulo']);

        Noticia::create($data);
        return back()->with('flash', 'Noticia/Evento creado.');
    }

    public function update(Request $request, Noticia $noticia)
    {
        $data = $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:400',
            'contenido'    => 'required|string',
            'categoria'    => 'required|in:noticia,evento,comunicado',
            'activo'       => 'boolean',
            'publicado_en' => 'nullable|date',
        ]);

        $noticia->update($data);
        return back()->with('flash', 'Noticia/Evento actualizado.');
    }

    public function destroy(Noticia $noticia)
    {
        $noticia->forceDelete();
        return back()->with('flash', 'Noticia/Evento eliminado.');
    }
}
