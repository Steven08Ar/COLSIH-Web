<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotspot;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HotspotController extends Controller
{
    /**
     * Guarda un nuevo hotspot para la escena.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'scene_id'         => ['required', 'exists:scenes,id'],
            'tipo'             => ['required', 'in:enlace,info'],
            'yaw'              => ['required', 'numeric'],
            'pitch'            => ['required', 'numeric'],
            'texto'            => ['nullable', 'string', 'max:255'],
            'scene_destino_id' => ['nullable', 'exists:scenes,id'],
        ]);

        Hotspot::create($validated);

        return back()->with('flash', 'Punto interactivo guardado exitosamente.');
    }

    /**
     * Actualiza un hotspot existente.
     */
    public function update(Request $request, Hotspot $hotspot): RedirectResponse
    {
        $validated = $request->validate([
            'tipo'             => ['required', 'in:enlace,info'],
            'yaw'              => ['required', 'numeric'],
            'pitch'            => ['required', 'numeric'],
            'texto'            => ['nullable', 'string', 'max:255'],
            'scene_destino_id' => ['nullable', 'exists:scenes,id'],
        ]);

        $hotspot->update($validated);

        return back()->with('flash', 'Punto interactivo actualizado correctamente.');
    }

    /**
     * Elimina un hotspot.
     */
    public function destroy(Hotspot $hotspot): RedirectResponse
    {
        $hotspot->delete();

        return back()->with('flash', 'Punto interactivo eliminado.');
    }
}
