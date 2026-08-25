<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonio;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonioController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'seccion'     => 'testimonios',
            'testimonios' => Testimonio::orderBy('orden')->orderBy('id')->get(),
            'noticias'    => [],
            'preguntas'   => [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre'        => 'required|string|max:120',
            'cargo'         => 'nullable|string|max:120',
            'texto'         => 'required|string|max:600',
            'imagen'        => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif,HEIC,HEIF|max:20480',
            'foto_posicion' => 'nullable|numeric|min:0|max:100',
            'video_url'     => 'nullable|max:300',
            'video_activo'  => 'boolean',
            'activo'        => 'boolean',
            'orden'         => 'integer|min:0',
        ]);

        $data['imagen'] = ImageOptimizer::guardar($request->file('imagen'), 'testimonios');

        Testimonio::create($data);
        return redirect()->route('admin.testimonios')->with('flash', 'Testimonio creado.');
    }

    public function update(Request $request, Testimonio $testimonio)
    {
        $data = $request->validate([
            'nombre'        => 'required|string|max:120',
            'cargo'         => 'nullable|string|max:120',
            'texto'         => 'required|string|max:600',
            'imagen'        => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif,HEIC,HEIF|max:20480',
            'foto_posicion' => 'nullable|numeric|min:0|max:100',
            'video_url'     => 'nullable|max:300',
            'video_activo'  => 'boolean',
            'activo'        => 'boolean',
            'orden'         => 'integer|min:0',
        ]);

        if ($request->hasFile('imagen')) {
            ImageOptimizer::eliminar($testimonio->imagen);
            $data['imagen'] = ImageOptimizer::guardar($request->file('imagen'), 'testimonios');
        } else {
            unset($data['imagen']);
        }

        $testimonio->update($data);
        return redirect()->route('admin.testimonios')->with('flash', 'Testimonio actualizado.');
    }

    public function destroy(Testimonio $testimonio)
    {
        ImageOptimizer::eliminar($testimonio->imagen);
        $testimonio->delete();
        return redirect()->route('admin.testimonios')->with('flash', 'Testimonio eliminado.');
    }
}
