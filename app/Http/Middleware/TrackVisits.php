<?php

namespace App\Http\Middleware;

use App\Models\VisitaWeb;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Solo rastrear peticiones GET exitosas no administrativas
        if ($request->isMethod('GET') && $response->getStatusCode() < 400) {
            VisitaWeb::registrar($request);
        }

        return $response;
    }
}
