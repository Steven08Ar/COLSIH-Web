<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInscripcionRequest;
use App\Models\Inscripcion;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InscripcionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Inscripcion/Index');
    }

    public function store(StoreInscripcionRequest $request): RedirectResponse
    {
        $inscripcion = Inscripcion::create($request->validated());

        return redirect()->route('inscripcion.confirmacion', $inscripcion->id);
    }

    public function confirmacion(Inscripcion $inscripcion): Response
    {
        return Inertia::render('Inscripcion/Confirmacion', [
            'inscripcion' => [
                'id'                          => $inscripcion->id,
                'nombre_estudiante'           => $inscripcion->nombre_completo_estudiante,
                'grado_solicitado'            => $inscripcion->grado_solicitado,
                'acudiente_email'             => $inscripcion->acudiente_email,
                'estado'                      => $inscripcion->estado,
            ],
        ]);
    }
}

