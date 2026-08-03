<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EquipoMember;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipoAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'seccion' => 'equipo',
            'equipo'  => EquipoMember::orderBy('tipo')->orderBy('orden')->orderBy('nombre')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre'        => 'required|string|max:150',
            'cargo'         => 'required|string|max:150',
            'area'          => 'required|string|max:150',
            'tipo'          => 'required|string|in:directivo,docente',
            'foto'            => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif,HEIC,HEIF|max:20480',
            'foto_posicion'   => 'nullable|integer|min:0|max:100',
            'foto_posicion_x' => 'nullable|integer|min:0|max:100',
            'foto_posicion_y' => 'nullable|integer|min:0|max:100',
            'foto_zoom'       => 'nullable|integer|min:50|max:300',
            'orden'           => 'nullable|integer|min:0',
            'activo'          => 'boolean',
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = ImageOptimizer::guardar($request->file('foto'), 'docentes');
        }

        EquipoMember::create($data);
        return back()->with('flash', 'Integrante del equipo agregado exitosamente.');
    }

    public function update(Request $request, EquipoMember $member)
    {
        $data = $request->validate([
            'nombre'          => 'required|string|max:150',
            'cargo'           => 'required|string|max:150',
            'area'            => 'required|string|max:150',
            'tipo'            => 'required|string|in:directivo,docente',
            'foto'            => 'nullable',
            'foto_posicion'   => 'nullable|integer|min:0|max:100',
            'foto_posicion_x' => 'nullable|integer|min:0|max:100',
            'foto_posicion_y' => 'nullable|integer|min:0|max:100',
            'foto_zoom'       => 'nullable|integer|min:50|max:300',
            'orden'         => 'nullable|integer|min:0',
            'activo'        => 'boolean',
        ]);

        if ($request->hasFile('foto')) {
            ImageOptimizer::eliminar($member->foto);
            $data['foto'] = ImageOptimizer::guardar($request->file('foto'), 'docentes');
        } else {
            unset($data['foto']);
        }

        $member->update($data);
        return back()->with('flash', 'Integrante del equipo actualizado exitosamente.');
    }

    public function destroy(EquipoMember $member)
    {
        ImageOptimizer::eliminar($member->foto);
        $member->delete();
        return back()->with('flash', 'Integrante eliminado exitosamente.');
    }
}
