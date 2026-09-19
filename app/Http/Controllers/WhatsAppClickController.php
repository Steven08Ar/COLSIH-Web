<?php

namespace App\Http\Controllers;

use App\Models\WhatsAppClick;
use Illuminate\Http\Request;

class WhatsAppClickController extends Controller
{
    public function store(Request $request)
    {
        $pagina = $request->input('pagina');

        try {
            WhatsAppClick::create([
                'pagina' => $pagina ? substr($pagina, 0, 250) : null,
            ]);
        } catch (\Throwable) {}

        return response()->noContent();
    }
}
