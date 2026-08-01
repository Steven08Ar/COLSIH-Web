<?php

namespace App\Http\Controllers;

use App\Mail\SuscripcionConfirmada;
use App\Mail\SuscripcionNotificacion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SuscripcionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'correo' => ['required', 'email', 'max:255'],
        ]);

        $correo = $request->input('correo');

        Mail::to($correo)->send(new SuscripcionConfirmada($correo));
        Mail::to('colsantaisabeldehungria.fblanca@gmail.com')->send(new SuscripcionNotificacion($correo));

        return back()->with('suscripcion_ok', true);
    }
}
