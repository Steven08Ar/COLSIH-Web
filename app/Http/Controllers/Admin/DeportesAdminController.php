<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DeporteCarrusel;
use App\Models\Noticia;
use App\Models\TorneoPartido;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DeportesAdminController extends Controller
{
    public function index()
    {
        self::seedDefaultMatchesIfNeeded();

        $configMatch = TorneoPartido::where('fase', 'config')->first();
        $cuadrangularesBloqueado = $configMatch ? ($configMatch->estado === 'bloqueado') : false;

        return Inertia::render('Admin/Dashboard', [
            'seccion'                 => 'deportes-admin',
            'torneoPartidos'          => TorneoPartido::where('fase', '!=', 'config')->orderBy('id')->get(),
            'deportesBanners'         => DeporteCarrusel::orderBy('orden')->get(),
            'cuadrangularesBloqueado' => $cuadrangularesBloqueado,
            'noticiasDeportivas'      => Noticia::where('es_deporte', true)->latest()->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'seccion', 'activo', 'publicado_en']),
        ]);
    }

    public function toggleBloqueo(Request $request)
    {
        $config = TorneoPartido::firstOrCreate(
            ['fase' => 'config', 'posicion_llave' => 0],
            ['equipo_local' => 'Configuracion', 'equipo_visitante' => 'Torneo', 'estado' => 'activo']
        );

        $nuevoEstado = $config->estado === 'bloqueado' ? 'activo' : 'bloqueado';
        $config->update(['estado' => $nuevoEstado]);

        $msg = $nuevoEstado === 'bloqueado'
            ? 'Cuadrangulares bloqueados (Receso de temporada activado).'
            : 'Cuadrangulares desbloqueados (Llaves visibles).';

        return redirect()->route('admin.deportes-admin')->with('flash', $msg);
    }

    public static function seedDefaultMatchesIfNeeded()
    {
        if (TorneoPartido::count() === 0) {
            $defaultMatches = [
                // Cuartos de Final (4 Partidos Inter-clases)
                ['fase' => 'cuartos', 'posicion_llave' => 1, 'equipo_local' => 'Grado 6°A', 'equipo_visitante' => 'Grado 7°B', 'fecha_partido' => 'Cuartos 1'],
                ['fase' => 'cuartos', 'posicion_llave' => 2, 'equipo_local' => 'Grado 8°A', 'equipo_visitante' => 'Grado 9°B', 'fecha_partido' => 'Cuartos 2'],
                ['fase' => 'cuartos', 'posicion_llave' => 3, 'equipo_local' => 'Grado 10°A', 'equipo_visitante' => 'Grado 11°A', 'fecha_partido' => 'Cuartos 3'],
                ['fase' => 'cuartos', 'posicion_llave' => 4, 'equipo_local' => 'Docentes', 'equipo_visitante' => 'Estudiantes', 'fecha_partido' => 'Cuartos 4'],
                
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
                'tag' => 'Deportes COLSIH',
                'subtitulo' => 'Colegio Santa Isabel de Hungría',
                'titulo' => 'PRÓXIMAMENTE NOTICIAS DEPORTIVAS INSTITUCIONALES',
                'descripcion' => 'Próximamente en esta sección se publicarán todas las noticias, resultados y torneos deportivos destacados de la institución.',
                'imagen' => 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1600&q=80',
                'orden' => 1,
                'activo' => true,
            ]);
        }
    }

    public function actualizarPartido(Request $request, TorneoPartido $partido)
    {
        $data = $request->validate([
            'equipo_local'         => 'required|string|max:100',
            'equipo_visitante'     => 'required|string|max:100',
            'escudo_local'         => 'nullable|string|max:255',
            'escudo_visitante'     => 'nullable|string|max:255',
            'escudo_local_file'    => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif|max:10240',
            'escudo_visitante_file'=> 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif|max:10240',
            'goles_local'          => 'nullable|integer',
            'goles_visitante'      => 'nullable|integer',
            'ganador'              => 'nullable|string|in:local,visitante,empate',
            'estado'               => 'nullable|string|in:programado,en_curso,finalizado',
            'fecha_partido'        => 'nullable|string|max:100',
        ]);

        if ($request->hasFile('escudo_local_file')) {
            $data['escudo_local'] = ImageOptimizer::guardar($request->file('escudo_local_file'), 'escudos');
        }

        if ($request->hasFile('escudo_visitante_file')) {
            $data['escudo_visitante'] = ImageOptimizer::guardar($request->file('escudo_visitante_file'), 'escudos');
        }

        unset($data['escudo_local_file'], $data['escudo_visitante_file']);

        $partido->update($data);

        // Auto-advance winners to next round bracket slot
        $this->avanzarGanador($partido);

        return redirect()->route('admin.deportes-admin')->with('flash', 'Partido actualizado y llaves sincronizadas.');
    }

    private function avanzarGanador(TorneoPartido $partido)
    {
        if (!$partido->ganador) return;

        $nombreGanador = $partido->ganador === 'local' ? $partido->equipo_local : $partido->equipo_visitante;
        $escudoGanador = $partido->ganador === 'local' ? $partido->escudo_local : $partido->escudo_visitante;

        if ($partido->fase === 'cuartos') {
            if ($partido->posicion_llave === 1) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 1)->update([
                    'equipo_local' => $nombreGanador,
                    'escudo_local' => $escudoGanador
                ]);
            } else if ($partido->posicion_llave === 2) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 1)->update([
                    'equipo_visitante' => $nombreGanador,
                    'escudo_visitante' => $escudoGanador
                ]);
            } else if ($partido->posicion_llave === 3) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 2)->update([
                    'equipo_local' => $nombreGanador,
                    'escudo_local' => $escudoGanador
                ]);
            } else if ($partido->posicion_llave === 4) {
                TorneoPartido::where('fase', 'semifinal')->where('posicion_llave', 2)->update([
                    'equipo_visitante' => $nombreGanador,
                    'escudo_visitante' => $escudoGanador
                ]);
            }
        } else if ($partido->fase === 'semifinal') {
            if ($partido->posicion_llave === 1) {
                TorneoPartido::where('fase', 'final')->where('posicion_llave', 1)->update([
                    'equipo_local' => $nombreGanador,
                    'escudo_local' => $escudoGanador
                ]);
            } else if ($partido->posicion_llave === 2) {
                TorneoPartido::where('fase', 'final')->where('posicion_llave', 1)->update([
                    'equipo_visitante' => $nombreGanador,
                    'escudo_visitante' => $escudoGanador
                ]);
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
        return redirect()->route('admin.deportes-admin')->with('flash', 'Banner deportivo agregado.');
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

        if ($request->boolean('eliminar_imagen') && !$request->hasFile('portada')) {
            if ($banner->imagen && !str_starts_with($banner->imagen, 'http')) {
                ImageOptimizer::eliminar($banner->imagen);
            }
            $data['imagen'] = null;
        }

        if ($request->hasFile('portada')) {
            if ($banner->imagen && !str_starts_with($banner->imagen, 'http')) {
                ImageOptimizer::eliminar($banner->imagen);
            }
            $data['imagen'] = ImageOptimizer::guardar($request->file('portada'), 'deportes');
        }

        $banner->update($data);
        return redirect()->route('admin.deportes-admin')->with('flash', 'Banner deportivo actualizado.');
    }

    public function destroyBanner(DeporteCarrusel $banner)
    {
        if ($banner->imagen && !str_starts_with($banner->imagen, 'http')) {
            ImageOptimizer::eliminar($banner->imagen);
        }
        $banner->delete();
        return redirect()->route('admin.deportes-admin')->with('flash', 'Banner eliminado.');
    }

    public function storeNoticiaDeportiva(Request $request)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:600',
            'seccion'      => 'nullable|string|max:80',
            'activo'       => 'nullable',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif|max:20480',
        ]);

        $slug = Str::slug($request->titulo);
        $base = $slug;
        $i = 1;
        while (Noticia::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        $data = [
            'titulo'       => $request->titulo,
            'slug'         => $slug,
            'resumen'      => $request->resumen,
            'seccion'      => $request->seccion ?: 'deportes',
            'categoria'    => 'noticia',
            'es_deporte'   => true,
            'activo'       => $request->boolean('activo'),
            'publicado_en' => $request->publicado_en ?: now()->toDateTimeString(),
            'contenido'    => '',
            'bloques'      => [],
        ];

        if ($request->hasFile('portada')) {
            $data['imagen'] = ImageOptimizer::guardar($request->file('portada'), 'noticias/deportes');
        }

        Noticia::create($data);
        return redirect()->route('admin.deportes-admin')->with('flash', 'Publicación deportiva creada.');
    }

    public function updateNoticiaDeportiva(Request $request, Noticia $noticia)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:600',
            'seccion'      => 'nullable|string|max:80',
            'activo'       => 'nullable',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif|max:20480',
        ]);

        $data = [
            'titulo'       => $request->titulo,
            'resumen'      => $request->resumen,
            'seccion'      => $request->seccion ?: 'deportes',
            'es_deporte'   => true,
            'activo'       => $request->boolean('activo'),
            'publicado_en' => $request->publicado_en ?: ($noticia->publicado_en?->toDateTimeString() ?? now()->toDateTimeString()),
        ];

        if ($request->boolean('eliminar_imagen') && !$request->hasFile('portada')) {
            ImageOptimizer::eliminar($noticia->imagen);
            $data['imagen'] = null;
        }

        if ($request->hasFile('portada')) {
            ImageOptimizer::eliminar($noticia->imagen);
            $data['imagen'] = ImageOptimizer::guardar($request->file('portada'), 'noticias/deportes');
        }

        $noticia->update($data);
        return redirect()->route('admin.deportes-admin')->with('flash', 'Publicación deportiva actualizada.');
    }

    public function destroyNoticiaDeportiva(Noticia $noticia)
    {
        ImageOptimizer::eliminar($noticia->imagen);
        $noticia->forceDelete();
        return redirect()->route('admin.deportes-admin')->with('flash', 'Publicación deportiva eliminada.');
    }
}
