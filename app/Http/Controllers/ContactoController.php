<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMensajeContactoRequest;
use App\Mail\ContactoRecibido;
use App\Models\MensajeContacto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
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
        $mensaje = MensajeContacto::create($request->validated());

        Mail::to('colsantaisabeldehungria.fblanca@gmail.com')->send(new ContactoRecibido($mensaje));

        return redirect()->route('contacto.index')
            ->with('success', 'Tu mensaje fue enviado. Te responderemos pronto.');
    }
}

