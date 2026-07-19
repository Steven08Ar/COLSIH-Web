<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonio;
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
            'nombre'    => 'required|string|max:120',
            'cargo'     => 'nullable|string|max:120',
            'texto'     => 'required|string|max:600',
            'imagen'    => 'required|image|max:4096',
            'video_url' => 'nullable|url|max:300',
            'activo'    => 'boolean',
            'orden'     => 'integer|min:0',
        ]);

        $data['imagen'] = $request->file('imagen')->store('testimonios', 'public');

        Testimonio::create($data);
        return back()->with('flash', 'Testimonio creado.');
    }

    public function update(Request $request, Testimonio $testimonio)
    {
        $data = $request->validate([
            'nombre'    => 'required|string|max:120',
            'cargo'     => 'nullable|string|max:120',
            'texto'     => 'required|string|max:600',
            'imagen'    => 'nullable|image|max:4096',
            'video_url' => 'nullable|url|max:300',
            'activo'    => 'boolean',
            'orden'     => 'integer|min:0',
        ]);

        if ($request->hasFile('imagen')) {
            if ($testimonio->imagen) {
                Storage::disk('public')->delete($testimonio->imagen);
            }
            $data['imagen'] = $request->file('imagen')->store('testimonios', 'public');
        } else {
            unset($data['imagen']);
        }

        $testimonio->update($data);
        return back()->with('flash', 'Testimonio actualizado.');
    }

    public function destroy(Testimonio $testimonio)
    {
        if ($testimonio->imagen) {
            Storage::disk('public')->delete($testimonio->imagen);
        }
        $testimonio->delete();
        return back()->with('flash', 'Testimonio eliminado.');
    }
}
