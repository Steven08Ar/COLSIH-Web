<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NoticiaAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'seccion'     => 'noticias',
            'testimonios' => [],
            'noticias'    => Noticia::latest()->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'categoria', 'activo', 'publicado_en']),
            'preguntas'   => [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:500',
            'categoria'    => 'required|in:noticia,evento,comunicado',
            'activo'       => 'boolean',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|image|max:6144',
        ]);

        $data = $request->only(['titulo', 'resumen', 'categoria', 'activo', 'publicado_en']);
        $data['contenido'] = '';
        $data['slug'] = Str::slug($data['titulo']);

        if ($request->hasFile('portada')) {
            $data['imagen'] = $request->file('portada')->store('noticias/portadas', 'public');
        }

        $data['bloques'] = $this->procesarBloques($request, []);

        Noticia::create($data);
        return back()->with('flash', 'Publicacion creada.');
    }

    public function update(Request $request, Noticia $noticia)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:500',
            'categoria'    => 'required|in:noticia,evento,comunicado',
            'activo'       => 'boolean',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|image|max:6144',
        ]);

        $data = $request->only(['titulo', 'resumen', 'categoria', 'activo', 'publicado_en']);

        if ($request->hasFile('portada')) {
            if ($noticia->imagen) {
                Storage::disk('public')->delete($noticia->imagen);
            }
            $data['imagen'] = $request->file('portada')->store('noticias/portadas', 'public');
        }

        $data['bloques'] = $this->procesarBloques($request, $noticia->bloques ?? []);

        $noticia->update($data);
        return back()->with('flash', 'Publicacion actualizada.');
    }

    public function destroy(Noticia $noticia)
    {
        if ($noticia->imagen) {
            Storage::disk('public')->delete($noticia->imagen);
        }
        if ($noticia->bloques) {
            foreach ($noticia->bloques as $b) {
                if (($b['tipo'] ?? '') === 'imagen' && !empty($b['imagen'])) {
                    Storage::disk('public')->delete($b['imagen']);
                }
            }
        }
        $noticia->forceDelete();
        return back()->with('flash', 'Publicacion eliminada.');
    }

    private function procesarBloques(Request $request, array $bloquesActuales): array
    {
        $raw = $request->input('bloques', '[]');
        $bloques = json_decode($raw, true) ?? [];

        // Map de imagenes existentes por clave unica para mantenerlas al editar
        $existentes = [];
        foreach ($bloquesActuales as $b) {
            if (($b['tipo'] ?? '') === 'imagen' && !empty($b['imagen']) && !empty($b['_key'])) {
                $existentes[$b['_key']] = $b['imagen'];
            }
        }

        foreach ($bloques as $idx => &$bloque) {
            if (($bloque['tipo'] ?? '') !== 'imagen') {
                continue;
            }

            $fileKey = "img_bloque_{$idx}";
            if ($request->hasFile($fileKey)) {
                // Si habia imagen previa para este bloque, borrarla
                if (!empty($bloque['imagen'])) {
                    Storage::disk('public')->delete($bloque['imagen']);
                }
                $bloque['imagen'] = $request->file($fileKey)->store('noticias/bloques', 'public');
            } elseif (empty($bloque['imagen']) && !empty($bloque['_key']) && isset($existentes[$bloque['_key']])) {
                // Conservar imagen existente
                $bloque['imagen'] = $existentes[$bloque['_key']];
            }

            unset($bloque['_file_pending']);
        }
        unset($bloque);

        return $bloques;
    }
}
