<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonioController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'seccion'      => 'testimonios',
            'testimonios'  => Testimonio::orderBy('orden')->orderBy('id')->get(),
            'noticias'     => [],
            'preguntas'    => [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:120',
            'cargo'  => 'nullable|string|max:120',
            'texto'  => 'required|string|max:600',
            'activo' => 'boolean',
            'orden'  => 'integer|min:0',
        ]);

        Testimonio::create($data);
        return back()->with('flash', 'Testimonio creado.');
    }

    public function update(Request $request, Testimonio $testimonio)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:120',
            'cargo'  => 'nullable|string|max:120',
            'texto'  => 'required|string|max:600',
            'activo' => 'boolean',
            'orden'  => 'integer|min:0',
        ]);

        $testimonio->update($data);
        return back()->with('flash', 'Testimonio actualizado.');
    }

    public function destroy(Testimonio $testimonio)
    {
        $testimonio->delete();
        return back()->with('flash', 'Testimonio eliminado.');
    }
}
