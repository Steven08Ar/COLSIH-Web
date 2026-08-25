<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Carnet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarnetsAdminController extends Controller
{
    /**
     * Renderiza el panel de administración en la pestaña de Carnets y Tarjetas NFC.
     */
    public function index()
    {
        // Sembrar datos iniciales de prueba si la tabla está vacía
        if (Carnet::count() === 0) {
            Carnet::create([
                'code' => 'EST-101',
                'nfc' => 'NFC-101',
                'nombre' => 'Santiago',
                'apellido' => 'Camacho Corzo',
                'rol' => 'Estudiante',
                'info' => 'Grado 11° - Bachillerato',
            ]);

            Carnet::create([
                'code' => 'DOC-102',
                'nfc' => 'NFC-102',
                'nombre' => 'Yoleida Patricia',
                'apellido' => 'Camacho Corzo',
                'rol' => 'Docente',
                'info' => 'Docente de Primaria y Preescolar',
                'foto' => 'https://media.colsih.edu.co/equipo/Yoleida_Patricia_Camacho_Corzo.jpg',
            ]);

            Carnet::create([
                'code' => 'EST-103',
                'nfc' => 'NFC-103',
                'nombre' => 'Carlos Eduardo',
                'apellido' => 'Ramírez Silva',
                'rol' => 'Estudiante',
                'info' => 'Grado 10° - Articulación SENA',
            ]);

            Carnet::create([
                'code' => 'DOC-104',
                'nfc' => 'NFC-104',
                'nombre' => 'María Fernanda',
                'apellido' => 'Gómez López',
                'rol' => 'Docente',
                'info' => 'Coordinadora Académica',
            ]);
        }

        $carnets = Carnet::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Dashboard', [
            'seccion' => 'carnets',
            'carnets' => $carnets,
            'flash'   => session('flash'),
        ]);
    }

    /**
     * Registra una nueva tarjeta NFC / Carnet Institucional.
     */
    public function store(Request $request)
    {
        $request->validate([
            'code'     => 'required|string|max:100|unique:carnets,code',
            'nfc'      => 'nullable|string|max:100|unique:carnets,nfc',
            'nombre'   => 'required|string|max:150',
            'apellido' => 'required|string|max:150',
            'rol'      => 'required|string|in:Estudiante,Docente,Administrativo,Visitante',
            'info'     => 'nullable|string|max:255',
            'foto'     => 'nullable|string|max:500',
            'activo'   => 'nullable|boolean',
        ]);

        Carnet::create([
            'code'     => strtoupper(trim($request->code)),
            'nfc'      => $request->nfc ? strtoupper(trim($request->nfc)) : null,
            'nombre'   => trim($request->nombre),
            'apellido' => trim($request->apellido),
            'rol'      => $request->rol,
            'info'     => $request->info ? trim($request->info) : null,
            'foto'     => $request->foto ? trim($request->foto) : null,
            'activo'   => $request->boolean('activo', true),
        ]);

        return redirect()->route('admin.carnets-admin')->with('flash', 'Tarjeta Carnet/NFC registrada exitosamente.');
    }

    /**
     * Actualiza los datos de una tarjeta NFC / Carnet existente.
     */
    public function update(Request $request, Carnet $carnet)
    {
        $request->validate([
            'code'     => "required|string|max:100|unique:carnets,code,{$carnet->id}",
            'nfc'      => "nullable|string|max:100|unique:carnets,nfc,{$carnet->id}",
            'nombre'   => 'required|string|max:150',
            'apellido' => 'required|string|max:150',
            'rol'      => 'required|string|in:Estudiante,Docente,Administrativo,Visitante',
            'info'     => 'nullable|string|max:255',
            'foto'     => 'nullable|string|max:500',
            'activo'   => 'nullable|boolean',
        ]);

        $carnet->update([
            'code'     => strtoupper(trim($request->code)),
            'nfc'      => $request->nfc ? strtoupper(trim($request->nfc)) : null,
            'nombre'   => trim($request->nombre),
            'apellido' => trim($request->apellido),
            'rol'      => $request->rol,
            'info'     => $request->info ? trim($request->info) : null,
            'foto'     => $request->foto ? trim($request->foto) : null,
            'activo'   => $request->boolean('activo', true),
        ]);

        return redirect()->route('admin.carnets-admin')->with('flash', 'Tarjeta Carnet/NFC actualizada correctamente.');
    }

    /**
     * Elimina una tarjeta NFC / Carnet.
     */
    public function destroy(Carnet $carnet)
    {
        $carnet->delete();
        return redirect()->route('admin.carnets-admin')->with('flash', 'Tarjeta Carnet/NFC eliminada del sistema.');
    }

    /**
     * Prueba de lectura de tarjeta NFC o Código de Barras en tiempo real.
     */
    public function probar(Request $request)
    {
        $codigo = strtoupper(trim($request->input('codigo', '')));
        if (!$codigo) {
            return response()->json(['found' => false, 'message' => 'Código vacío']);
        }

        $carnet = Carnet::where('code', $codigo)
            ->orWhere('nfc', $codigo)
            ->first();

        if ($carnet) {
            return response()->json([
                'found' => true,
                'carnet' => $carnet,
                'message' => 'Tarjeta escaneada con éxito'
            ]);
        }

        return response()->json([
            'found' => false,
            'message' => "La tarjeta con código '{$codigo}' no está registrada aún."
        ]);
    }
}
