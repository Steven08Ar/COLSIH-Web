<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMensajeContactoRequest;
use App\Models\MensajeContacto;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contacto');
    }

    public function store(StoreMensajeContactoRequest $request): RedirectResponse
    {
        MensajeContacto::create($request->validated());

        return redirect()->route('contacto.index')
            ->with('success', 'Tu mensaje fue enviado. Te responderemos pronto.');
    }
}

