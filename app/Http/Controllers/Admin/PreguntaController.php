<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PreguntaFrecuente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreguntaController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'seccion'      => 'preguntas',
            'testimonios'  => [],
            'noticias'     => [],
            'preguntas'    => PreguntaFrecuente::orderBy('orden')->orderBy('id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pregunta'  => 'required|string|max:300',
            'respuesta' => 'required|string|max:1000',
            'activo'    => 'boolean',
            'orden'     => 'integer|min:0',
        ]);

        PreguntaFrecuente::create($data);
        return back()->with('flash', 'Pregunta creada.');
    }

    public function update(Request $request, PreguntaFrecuente $pregunta)
    {
        $data = $request->validate([
            'pregunta'  => 'required|string|max:300',
            'respuesta' => 'required|string|max:1000',
            'activo'    => 'boolean',
            'orden'     => 'integer|min:0',
        ]);

        $pregunta->update($data);
        return back()->with('flash', 'Pregunta actualizada.');
    }

    public function destroy(PreguntaFrecuente $pregunta)
    {
        $pregunta->delete();
        return back()->with('flash', 'Pregunta eliminada.');
    }
}
