<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use App\Models\Carnet;
use App\Models\EquipoMember;
use App\Models\Inscripcion;
use App\Models\MensajeContacto;
use App\Models\Noticia;
use App\Models\PreguntaFrecuente;
use App\Models\Scene;
use App\Models\Testimonio;
use App\Models\TorneoPartido;
use App\Models\VisitaWeb;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $ahora = Carbon::now();

        // ── 1. Conteos Reales ──
        $totalCarnets       = Carnet::count();
        $totalNoticias      = Noticia::count();
        $totalTestimonios   = Testimonio::count();
        $totalEquipo        = EquipoMember::count();
        $totalPreguntas     = PreguntaFrecuente::count();
        $totalScenes        = Scene::count();
        $totalPartidos      = TorneoPartido::count();
        $totalInscripciones = Inscripcion::count();
        $totalContactos     = MensajeContacto::count();

        // ── 2. Tráfico Real desde visitas_web ──
        $totalVisitas   = VisitaWeb::count();
        $visitasHoy     = VisitaWeb::whereDate('created_at', $ahora->toDateString())->count();
        $visitasAyer    = VisitaWeb::whereDate('created_at', $ahora->copy()->subDay()->toDateString())->count();
        $visitasSemana  = VisitaWeb::where('created_at', '>=', $ahora->copy()->subDays(7)->startOfDay())->count();
        $visitasMes     = VisitaWeb::where('created_at', '>=', $ahora->copy()->startOfMonth())->count();

        $crecimientoHoy = $visitasAyer > 0
            ? round((($visitasHoy - $visitasAyer) / $visitasAyer) * 100, 1)
            : ($visitasHoy > 0 ? 100.0 : 0.0);

        // ── 3. Tráfico Diario Real — Últimos 14 Días ──
        $diasSemanaNombres = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        $diasTrafico = [];

        // Consulta agrupada para rendimiento
        $visitasPorDia = VisitaWeb::where('created_at', '>=', $ahora->copy()->subDays(13)->startOfDay())
            ->selectRaw('DATE(created_at) as fecha, COUNT(*) as total, COUNT(DISTINCT ip_hash) as unicos')
            ->groupBy('fecha')
            ->pluck('unicos', 'fecha')
            ->toArray();
        $totalsPorDia = VisitaWeb::where('created_at', '>=', $ahora->copy()->subDays(13)->startOfDay())
            ->selectRaw('DATE(created_at) as fecha, COUNT(*) as total')
            ->groupBy('fecha')
            ->pluck('total', 'fecha')
            ->toArray();

        for ($i = 13; $i >= 0; $i--) {
            $fecha    = $ahora->copy()->subDays($i);
            $fechaStr = $fecha->toDateString();
            $diaSemana = $fecha->dayOfWeek;
            $label = $i === 0 ? 'Hoy' : ($diasSemanaNombres[$diaSemana] . ' ' . $fecha->format('d'));

            $diasTrafico[] = [
                'fecha'   => $fechaStr,
                'label'   => $label,
                'visitas' => (int) ($totalsPorDia[$fechaStr] ?? 0),
                'unicos'  => (int) ($visitasPorDia[$fechaStr] ?? 0),
            ];
        }

        // ── 4. Tráfico Mensual Real — Año Actual ──
        $mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        $mesActual    = $ahora->month;
        $anioActual   = $ahora->year;

        $isSqlite = DB::getDriverName() === 'sqlite';
        $monthExpr = $isSqlite
            ? "CAST(strftime('%m', created_at) AS INTEGER) as mes"
            : "MONTH(created_at) as mes";

        $visitasPorMes = VisitaWeb::whereYear('created_at', $anioActual)
            ->selectRaw("{$monthExpr}, COUNT(*) as total")
            ->groupBy('mes')
            ->pluck('total', 'mes')
            ->toArray();

        $traficoMensual = [];
        for ($m = 1; $m <= 12; $m++) {
            $traficoMensual[] = [
                'mes'     => $mesesNombres[$m - 1],
                'visitas' => (int) ($visitasPorMes[$m] ?? 0),
                'activo'  => $m === $mesActual,
            ];
        }

        // ── 5. Secciones Más Visitadas — Datos Reales de VisitaWeb ──
        $coloresSeccion = [
            '/admisiones'       => ['color' => 'bg-indigo-500', 'label' => 'Admisiones'],
            '/oferta-academica' => ['color' => 'bg-sky-500',    'label' => 'Oferta Académica'],
            '/noticias'         => ['color' => 'bg-emerald-500','label' => 'Noticias'],
            '/deportes'         => ['color' => 'bg-amber-500',  'label' => 'Deportes'],
            '/recorrido-virtual'=> ['color' => 'bg-purple-500', 'label' => 'Recorrido 360°'],
            '/nosotros'         => ['color' => 'bg-rose-500',   'label' => 'Nosotros'],
            '/contacto'         => ['color' => 'bg-teal-500',   'label' => 'Contacto'],
            '/'                 => ['color' => 'bg-slate-500',  'label' => 'Inicio'],
        ];

        $seccionesRaw = VisitaWeb::selectRaw('ruta, COUNT(*) as visitas')
            ->groupBy('ruta')
            ->orderByDesc('visitas')
            ->limit(6)
            ->get();

        $totalVisitasSecciones = max($seccionesRaw->sum('visitas'), 1);

        $seccionesPopulares = $seccionesRaw->map(function ($row) use ($coloresSeccion, $totalVisitasSecciones) {
            $rutaBase = strtok($row->ruta, '?');
            $rutaBase = preg_replace('/\/[a-z0-9-]{4,}$/', '', $rutaBase); // simplify slugs
            $meta     = $coloresSeccion[$rutaBase] ?? $coloresSeccion[$row->ruta] ?? null;
            return [
                'nombre'  => $meta['label'] ?? ucfirst(ltrim($row->ruta, '/')),
                'ruta'    => $row->ruta,
                'visitas' => (int) $row->visitas,
                'pct'     => (int) round(($row->visitas / $totalVisitasSecciones) * 100),
                'color'   => $meta['color'] ?? 'bg-slate-400',
            ];
        })->values()->toArray();

        // ── 6. Distribución de Dispositivos — Datos Reales ──
        $totalDevices = max(VisitaWeb::count(), 1);
        $mob  = VisitaWeb::where('dispositivo', 'mobile')->count();
        $desk = VisitaWeb::where('dispositivo', 'desktop')->count();
        $tab  = VisitaWeb::where('dispositivo', 'tablet')->count();

        $pDesk = round(($desk / $totalDevices) * 100);
        $pMob  = round(($mob  / $totalDevices) * 100);
        $pTab  = 100 - ($pDesk + $pMob);

        $dispositivos = [
            ['name' => 'Escritorio',     'count' => $desk, 'pct' => $pDesk . '%', 'color' => 'bg-indigo-500', 'textColor' => 'text-indigo-600 dark:text-indigo-400'],
            ['name' => 'Móvil / Celular','count' => $mob,  'pct' => $pMob  . '%', 'color' => 'bg-sky-500',    'textColor' => 'text-sky-600 dark:text-sky-400'],
            ['name' => 'Tablet',         'count' => $tab,  'pct' => $pTab  . '%', 'color' => 'bg-purple-500', 'textColor' => 'text-purple-600 dark:text-purple-400'],
        ];

        // ── 7. Distribución de Navegadores — Datos Reales ──
        $navegadoresRaw = VisitaWeb::selectRaw('navegador, COUNT(*) as total')
            ->whereNotNull('navegador')
            ->groupBy('navegador')
            ->orderByDesc('total')
            ->get();

        $totalNav = max($navegadoresRaw->sum('total'), 1);
        $coloresNav = [
            'Chrome'  => 'bg-amber-500',
            'Safari'  => 'bg-blue-500',
            'Firefox' => 'bg-orange-500',
            'Edge'    => 'bg-teal-500',
            'Otro'    => 'bg-slate-400',
        ];
        $navegadores = $navegadoresRaw->map(function ($r) use ($totalNav, $coloresNav) {
            return [
                'name'  => $r->navegador,
                'count' => (int) $r->total,
                'pct'   => round(($r->total / $totalNav) * 100),
                'color' => $coloresNav[$r->navegador] ?? 'bg-slate-400',
            ];
        })->values()->toArray();

        // ── 8. Top Noticias por Vistas — Reales ──
        $noticiasList = Noticia::orderByDesc('vistas')->orderByDesc('created_at')
            ->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'categoria', 'seccion', 'es_deporte', 'activo', 'vistas', 'publicado_en', 'created_at']);

        $totalVistasNoticias = max($noticiasList->sum('vistas'), 1);

        $topNoticias = $noticiasList->take(5)->map(function ($n, $idx) use ($totalVistasNoticias) {
            return [
                'id'           => $n->id,
                'titulo'       => $n->titulo,
                'slug'         => $n->slug,
                'categoria'    => $n->categoria,
                'seccion'      => $n->seccion,
                'imagen'       => $n->imagen,
                'vistas'       => (int) $n->vistas,
                'porcentaje'   => round(($n->vistas / $totalVistasNoticias) * 100, 1),
                'publicado_en' => $n->publicado_en ? $n->publicado_en->format('d/m/Y') : $n->created_at->format('d/m/Y'),
                'activo'       => (bool) $n->activo,
            ];
        });

        // ── 9. Top Testimonios por Vistas — Reales ──
        $testimoniosList = Testimonio::orderByDesc('vistas')->orderBy('orden')
            ->get(['id', 'nombre', 'cargo', 'texto', 'imagen', 'avatar', 'activo', 'vistas', 'created_at']);

        $totalVistasTestimonios = max($testimoniosList->sum('vistas'), 1);

        $topTestimonios = $testimoniosList->take(5)->map(function ($t, $idx) use ($totalVistasTestimonios) {
            return [
                'id'         => $t->id,
                'nombre'     => $t->nombre,
                'cargo'      => $t->cargo,
                'avatar'     => $t->avatar,
                'imagen'     => $t->imagen,
                'vistas'     => (int) $t->vistas,
                'porcentaje' => round(($t->vistas / $totalVistasTestimonios) * 100, 1),
                'activo'     => (bool) $t->activo,
            ];
        });

        // ── 10. Actividad Reciente del Sistema ──
        $actividadesRecientes = [];

        $ultimasNoticias = Noticia::latest()->take(2)->get();
        foreach ($ultimasNoticias as $n) {
            $actividadesRecientes[] = [
                'tipo'   => 'noticia',
                'titulo' => \Illuminate\Support\Str::limit($n->titulo, 40),
                'desc'   => ucfirst($n->categoria ?? 'general'),
                'fecha'  => $n->created_at->diffForHumans(),
                'icono'  => 'Newspaper',
                'color'  => 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30',
            ];
        }

        try {
            $ultimosCarnets = Carnet::latest()->take(2)->get();
            foreach ($ultimosCarnets as $c) {
                $nombre = trim(($c->nombre ?? '') . ' ' . ($c->apellido ?? ''));
                $actividadesRecientes[] = [
                    'tipo'   => 'carnet',
                    'titulo' => 'Carnet: ' . ($nombre ?: 'Estudiante'),
                    'desc'   => ($c->rol ?? 'Estudiante') . ' · ' . ($c->code ?? ''),
                    'fecha'  => $c->created_at?->diffForHumans() ?? 'Recientemente',
                    'icono'  => 'CreditCard',
                    'color'  => 'text-blue-600 bg-blue-50 dark:bg-blue-950/30',
                ];
            }
        } catch (\Throwable) {}

        try {
            $ultimoTestimonio = Testimonio::latest()->first();
            if ($ultimoTestimonio) {
                $actividadesRecientes[] = [
                    'tipo'   => 'testimonio',
                    'titulo' => 'Testimonio: ' . ($ultimoTestimonio->nombre ?? 'Usuario'),
                    'desc'   => $ultimoTestimonio->cargo ?? 'Comunidad COLSIH',
                    'fecha'  => $ultimoTestimonio->created_at?->diffForHumans() ?? 'Recientemente',
                    'icono'  => 'MessageSquareQuote',
                    'color'  => 'text-purple-600 bg-purple-50 dark:bg-purple-950/30',
                ];
            }
        } catch (\Throwable) {}

        try {
            $ultimoContacto = MensajeContacto::latest()->first();
            if ($ultimoContacto) {
                $actividadesRecientes[] = [
                    'tipo'   => 'contacto',
                    'titulo' => 'Mensaje de ' . ($ultimoContacto->nombre ?? 'Usuario web'),
                    'desc'   => $ultimoContacto->asunto ?? 'Consulta general',
                    'fecha'  => $ultimoContacto->created_at?->diffForHumans() ?? 'Hoy',
                    'icono'  => 'Mail',
                    'color'  => 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30',
                ];
            }
        } catch (\Throwable) {}

        try {
            $ultimaInscripcion = Inscripcion::latest()->first();
            if ($ultimaInscripcion) {
                $nombreInscripcion = trim(
                    ($ultimaInscripcion->estudiante_nombres ?? '') . ' ' . ($ultimaInscripcion->estudiante_apellidos ?? '')
                ) ?: 'Nuevo aspirante';
                $actividadesRecientes[] = [
                    'tipo'   => 'inscripcion',
                    'titulo' => 'Inscripción: ' . $nombreInscripcion,
                    'desc'   => $ultimaInscripcion->grado_solicitado ?? 'Solicitud recibida',
                    'fecha'  => $ultimaInscripcion->created_at?->diffForHumans() ?? 'Hoy',
                    'icono'  => 'ClipboardList',
                    'color'  => 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
                ];
            }
        } catch (\Throwable) {}

        // Ordenar por más reciente primero (ya están en orden por ID)
        $actividadesRecientes = array_slice($actividadesRecientes, 0, 6);

        return Inertia::render('Admin/Dashboard', [
            'seccion' => 'dashboard',
            'adminCounts' => [
                'carnets'       => $totalCarnets,
                'noticias'      => $totalNoticias,
                'testimonios'   => $totalTestimonios,
                'equipo'        => $totalEquipo,
                'preguntas'     => $totalPreguntas,
                'scenes'        => $totalScenes,
                'partidos'      => $totalPartidos,
                'inscripciones' => $totalInscripciones,
                'contactos'     => $totalContactos,
            ],
            'analytics' => [
                'total_visitas'             => $totalVisitas,
                'visitas_hoy'               => $visitasHoy,
                'visitas_ayer'              => $visitasAyer,
                'visitas_semana'            => $visitasSemana,
                'visitas_mes'               => $visitasMes,
                'crecimiento_hoy'           => $crecimientoHoy,
                'dias_trafico'              => $diasTrafico,
                'trafico_mensual'           => $traficoMensual,
                'total_vistas_noticias'     => $noticiasList->sum('vistas'),
                'top_noticias'              => $topNoticias,
                'total_vistas_testimonios'  => $testimoniosList->sum('vistas'),
                'top_testimonios'           => $topTestimonios,
                'dispositivos'              => $dispositivos,
                'navegadores'               => $navegadores,
                'secciones_populares'       => $seccionesPopulares,
                'actividades_recientes'     => $actividadesRecientes,
            ],
            'carnets'        => [],
            'equipo'         => [],
            'testimonios'    => $testimoniosList,
            'noticias'       => $noticiasList,
            'preguntas'      => [],
            'torneoPartidos' => [],
            'adminUsuarios'  => [],
        ]);
    }
}
