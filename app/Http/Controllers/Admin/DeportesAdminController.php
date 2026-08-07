<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DeporteCarrusel;
use App\Models\TorneoPartido;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;

class DeportesAdminController extends Controller
{
    public function index()
    {
        self::seedDefaultMatchesIfNeeded();

        return Inertia::render('Admin/Dashboard', [
            'seccion'         => 'deportes',
            'torneoPartidos'  => TorneoPartido::orderBy('id')->get(),
            'deportesBanners' => DeporteCarrusel::orderBy('orden')->get(),
        ]);
    }

    public static function seedDefaultMatchesIfNeeded()
    {
        if (TorneoPartido::count() === 0) {
            $defaultMatches = [
                // Cuartos de Final (4 Partidos)
                ['fase' => 'cuartos', 'posicion_llave' => 1, 'equipo_local' => 'Casa Don Bosco', 'equipo_visitante' => 'Casa Domingo Savio', 'fecha_partido' => 'Cuartos 1'],
                ['fase' => 'cuartos', 'posicion_llave' => 2, 'equipo_local' => 'Casa María Auxiliadora', 'equipo_visitante' => 'Casa Santa Isabel', 'fecha_partido' => 'Cuartos 2'],
                ['fase' => 'cuartos', 'posicion_llave' => 3, 'equipo_local' => 'Casa Laura Vicuña', 'equipo_visitante' => 'Casa Ceferino Namuncurá', 'fecha_partido' => 'Cuartos 3'],
                ['fase' => 'cuartos', 'posicion_llave' => 4, 'equipo_local' => 'Selección Docentes', 'equipo_visitante' => 'Selección Estudiantes', 'fecha_partido' => 'Cuartos 4'],
                
                // Semifinales (2 Partidos)
                ['fase' => 'semifinal', 'posicion_llave' => 1, 'equipo_local' => 'Ganador Cuartos 1', 'equipo_visitante' => 'Ganador Cuartos 2', 'fecha_partido' => 'Semifinal 1'],
                ['fase' => 'semifinal', 'posicion_llave' => 2, 'equipo_local' => 'Ganador Cuartos 3', 'equipo_visitante' => 'Ganador Cuartos 4', 'fecha_partido' => 'Semifinal 2'],
                
                // Gran Final (1 Partido)
                ['fase' => 'final', 'posicion_llave' => 1, 'equipo_local' => 'Ganador Semifinal 1', 'equipo_visitante' => 'Ganador Semifinal 2', 'fecha_partido' => 'Gran Final'],
            ];

            foreach ($defaultMatches as $m) {
                TorneoPartido::create($m);
            }
        }

        if (DeporteCarrusel::count() === 0) {
            DeporteCarrusel::create([
                'tag' => 'Microfútbol Intercolegiado',
                'subtitulo' => 'Deportes COLSIH • Temporada 2026',
                'titulo' => 'GRAN COPA SALESIANA DE MICROFÚTBOL INTER-CASAS',
                'descripcion' => 'Nuestros estudiantes compiten en un torneo lleno de espíritu deportivo, valores e integración institucional.',
                'imagen' => 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80',
                'orden' => 1,
                'activo' => true,
            ]);
        }
    }

    public function actualizarPartido(Request $request, TorneoPartido $partido)
    {
        $data = $request->validate([
            'equipo_local'     => 'required|string|max:100',
            'equipo_visitante' => 'required|string|max:100',
            'goles_local'      => 'nullable|integer',
            'goles_visitante'  => 'nullable|integer',
            'ganador'          => 'nullable|string|in:local,visitante,empate',
            'estado'           => 'nullable|string|in:programado,en_curso,finalizado',
            'fecha_partido'    => 'nullable|string|max:100',
        ]);

        $partido->update($data);

        // Auto-advance winners to next round bracket slot
        $this->avanzarGanador($partido);

        return back()->with('flash', 'Partido actualizado y llaves sincronizadas.');
    }

    private function avanzarGanador(TorneoPartido $partido)
    {
        if (!$partido->ganador) return;

        $nombreGanador = $partido->ganador === 'local' ? $partido->equipo_local : $partido->equipo_visitante;

        if ($partido->fase === 'cuartos') {
            if ($partido->posicion_llave === 1) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 1)->update(['equipo_local' => $nombreGanador]);
            } else if ($partido->posicion_llave === 2) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 1)->update(['equipo_visitante' => $nombreGanador]);
            } else if ($partido->posicion_llave === 3) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 2)->update(['equipo_local' => $nombreGanador]);
            } else if ($partido->posicion_llave === 4) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 2)->update(['equipo_visitante' => $nombreGanador]);
            }
        } else if ($partido->fase === 'semifinal') {
            if ($partido->posicion_llave === 1) {
                TorneoPartido::where('fase', 'final')->where('posicion_llave', 1)->update(['equipo_local' => $nombreGanador]);
            } else if ($partido->posicion_llave === 2) {
                TorneoPartido::where('fase', 'final')->where('posicion_llave', 1)->update(['equipo_visitante' => $nombreGanador]);
            }
        }
    }

    public function storeBanner(Request $request)
    {
        $request->validate([
            'titulo'      => 'required|string|max:200',
            'tag'         => 'nullable|string|max:100',
            'subtitulo'   => 'nullable|string|max:150',
            'descripcion' => 'nullable|string|max:1000',
            'portada'     => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif|max:20480',
        ]);

        $data = $request->only(['titulo', 'tag', 'subtitulo', 'descripcion']);
        $data['activo'] = $request->boolean('activo');

        if ($request->hasFile('portada')) {
            $data['imagen'] = ImageOptimizer::guardar($request->file('portada'), 'deportes');
        }

        DeporteCarrusel::create($data);
        return back()->with('flash', 'Banner deportivo agregado.');
    }

    public function updateBanner(Request $request, DeporteCarrusel $banner)
    {
        $request->validate([
            'titulo'      => 'required|string|max:200',
            'tag'         => 'nullable|string|max:100',
            'subtitulo'   => 'nullable|string|max:150',
            'descripcion' => 'nullable|string|max:1000',
            'portada'     => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif|max:20480',
        ]);

        $data = $request->only(['titulo', 'tag', 'subtitulo', 'descripcion']);
        $data['activo'] = $request->boolean('activo');

        if ($request->hasFile('portada')) {
            if ($banner->imagen && !str_starts_with($banner->imagen, 'http')) {
                ImageOptimizer::eliminar($banner->imagen);
            }
            $data['imagen'] = ImageOptimizer::guardar($request->file('portada'), 'deportes');
        }

        $banner->update($data);
        return back()->with('flash', 'Banner deportivo actualizado.');
    }

    public function destroyBanner(DeporteCarrusel $banner)
    {
        if ($banner->imagen && !str_starts_with($banner->imagen, 'http')) {
            ImageOptimizer::eliminar($banner->imagen);
        }
        $banner->delete();
        return back()->with('flash', 'Banner eliminado.');
    }
}
