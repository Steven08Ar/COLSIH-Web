<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NoticiaAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'seccion'     => 'noticias',
            'testimonios' => [],
            'noticias'    => Noticia::latest()->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'bloques', 'categoria', 'seccion', 'es_deporte', 'activo', 'publicado_en']),
            'preguntas'   => [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:500',
            'categoria'    => 'required|in:noticia,evento,comunicado,preescolar',
            'seccion'      => 'nullable|string|in:general,preescolar,primaria,bachillerato,sena,deportes',
            'es_deporte'   => 'nullable',
            'activo'       => 'nullable',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif,HEIC,HEIF|max:20480',
        ]);

        $data = $request->only(['titulo', 'resumen', 'categoria', 'seccion', 'publicado_en']);
        $data['seccion']      = $data['seccion'] ?? 'general';
        $data['es_deporte']   = $data['seccion'] === 'sena' ? false : ($data['seccion'] === 'deportes' || $request->boolean('es_deporte'));
        $data['activo']       = $request->boolean('activo');
        $data['publicado_en'] = $data['publicado_en'] ?: now()->toDateTimeString();
        $data['contenido']    = '';
        $data['slug']         = $this->uniqueSlug(Str::slug($data['titulo']));

        if ($request->hasFile('portada')) {
            $data['imagen'] = ImageOptimizer::guardar($request->file('portada'), $this->carpetaImagen($data['categoria'], $data['es_deporte']));
        }

        $data['bloques'] = $this->procesarBloques($request, [], $data['es_deporte']);
        $data['contenido'] = $this->compileBlocksToHtml($data['bloques']);

        Noticia::create($data);
        return redirect()->route('admin.noticias')->with('flash', 'Publicacion creada.');
    }

    public function update(Request $request, Noticia $noticia)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:500',
            'categoria'    => 'required|in:noticia,evento,comunicado,preescolar',
            'seccion'      => 'nullable|string|in:general,preescolar,primaria,bachillerato,sena,deportes',
            'es_deporte'   => 'nullable',
            'activo'       => 'nullable',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,heic,heif,HEIC,HEIF|max:20480',
        ]);

        $data = $request->only(['titulo', 'resumen', 'categoria', 'seccion', 'publicado_en']);
        $data['seccion']      = $data['seccion'] ?? 'general';
        $data['es_deporte']   = $data['seccion'] === 'sena' ? false : ($data['seccion'] === 'deportes' || $request->boolean('es_deporte'));
        $data['activo']       = $request->boolean('activo');
        $data['publicado_en'] = $data['publicado_en'] ?: ($noticia->publicado_en?->toDateTimeString() ?? now()->toDateTimeString());

        if ($request->hasFile('portada')) {
            ImageOptimizer::eliminar($noticia->imagen);
            $data['imagen'] = ImageOptimizer::guardar($request->file('portada'), $this->carpetaImagen($data['categoria'], $data['es_deporte']));
        }

        $data['bloques'] = $this->procesarBloques($request, $noticia->bloques ?? [], $data['es_deporte']);
        $data['contenido'] = $this->compileBlocksToHtml($data['bloques']);

        $noticia->update($data);
        return redirect()->route('admin.noticias')->with('flash', 'Publicacion actualizada.');
    }

    public function destroy(Noticia $noticia)
    {
        ImageOptimizer::eliminar($noticia->imagen);
        if ($noticia->bloques) {
            foreach ($noticia->bloques as $b) {
                if (($b['tipo'] ?? '') === 'imagen' && !empty($b['imagen'])) {
                    ImageOptimizer::eliminar($b['imagen']);
                }
                if (($b['tipo'] ?? '') === 'video' && !empty($b['videoFile'])) {
                    Storage::disk('public')->delete($b['videoFile']);
                }
            }
        }
        $noticia->forceDelete();
        return redirect()->route('admin.noticias')->with('flash', 'Publicacion eliminada.');
    }

    private function carpetaImagen(string $categoria, bool $esDeporte): string
    {
        if ($esDeporte) {
            return 'noticias/deportes';
        }
        return $this->carpetaCategoria($categoria);
    }

    private function carpetaCategoria(string $categoria): string
    {
        return match($categoria) {
            'evento'      => 'noticias/eventos',
            'comunicado'  => 'noticias/comunicados',
            'preescolar'  => 'noticias/preescolar',
            default       => 'noticias/articulos',
        };
    }

    private function uniqueSlug(string $base, ?int $excludeId = null): string
    {
        $slug = $base;
        $i    = 1;
        while (
            Noticia::where('slug', $slug)
                ->when($excludeId, fn ($q) => $q->where('id', '!=', $excludeId))
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }
        return $slug;
    }

    private function compileBlocksToHtml(array $bloques): string
    {
        $html = '<div class="flex flex-wrap -mx-3 items-start">';
        foreach ($bloques as $b) {
            $tipo  = $b['tipo']  ?? 'texto';
            $width = $b['width'] ?? 'completo';

            $widthClass = 'w-full px-3 my-4';
            if ($width === 'estrecho') {
                $widthClass = 'w-full md:w-1/3 px-3 my-4';
            } elseif ($width === 'mediano') {
                $widthClass = 'w-full md:w-1/2 px-3 my-4';
            }

            $blockHtml = '';

            if ($tipo === 'hero') {
                $tagline  = e($b['tagline']   ?? '');
                $titulo   = e($b['contenido'] ?? '');
                $subtit   = e($b['subtitulo'] ?? '');
                $btnTxt   = e($b['texto_boton'] ?? '');
                $btnUrl   = e($b['url_boton']   ?? '#');
                $btnColor = e($b['color_boton'] ?? '#003C8F');
                $tagHtml  = $tagline ? "<span class=\"inline-block bg-indigo-100 text-indigo-600 font-extrabold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full mb-4\">{$tagline}</span>" : '';
                $btnHtml  = $btnTxt ? "<a href=\"{$btnUrl}\" class=\"inline-block mt-5 px-8 py-3 rounded-xl font-bold text-white text-sm shadow-md\" style=\"background-color:{$btnColor}\">{$btnTxt}</a>" : '';
                $blockHtml .= "<div class=\"py-12 text-center\">{$tagHtml}<h1 class=\"text-3xl md:text-5xl font-black text-[#08111F] leading-tight\">{$titulo}</h1>" .
                    ($subtit ? "<p class=\"mt-4 text-slate-500 font-medium text-base md:text-lg leading-relaxed\">{$subtit}</p>" : '') . $btnHtml . "</div>";

            } elseif ($tipo === 'texto') {
                $contenido = e($b['contenido'] ?? '');
                $fmtStyles = [];
                if (!empty($b['formato']['bold']))       $fmtStyles[] = 'font-bold';
                if (!empty($b['formato']['italic']))     $fmtStyles[] = 'italic';
                if (!empty($b['formato']['underline']))  $fmtStyles[] = 'underline';

                $sizeClass  = 'text-base';
                if (($b['formato']['size'] ?? '') === 'grande')     $sizeClass = 'text-lg md:text-xl font-bold';
                if (($b['formato']['size'] ?? '') === 'muy-grande') $sizeClass = 'text-2xl md:text-3xl font-extrabold';

                $colorClass = 'text-slate-600';
                if (($b['formato']['color'] ?? '') === 'rojo') $colorClass = 'text-[#800A15]';
                if (($b['formato']['color'] ?? '') === 'azul') $colorClass = 'text-[#003C8F]';

                // Respect inline styles saved by new editor
                $inlineStyle = '';
                if (!empty($b['styles']['textColor'])) $inlineStyle .= 'color:' . e($b['styles']['textColor']) . ';';
                if (!empty($b['styles']['fontSize']))  $inlineStyle .= 'font-size:' . e($b['styles']['fontSize']) . ';';
                if (!empty($b['styles']['align']))     $inlineStyle .= 'text-align:' . e($b['styles']['align']) . ';';

                $blockHtml .= "<p class=\"{$sizeClass} {$colorClass} " . implode(' ', $fmtStyles) . " leading-relaxed text-left\" style=\"{$inlineStyle}\">{$contenido}</p>";

            } elseif ($tipo === 'titulo') {
                $contenido = e($b['contenido'] ?? '');
                $lvl = in_array($b['level'] ?? 'h3', ['h2', 'h3', 'h4']) ? ($b['level'] ?? 'h3') : 'h3';
                $sizeMap = ['h2' => 'text-2xl md:text-3xl', 'h3' => 'text-xl md:text-2xl', 'h4' => 'text-lg md:text-xl'];
                $sizeClass = $sizeMap[$lvl] ?? 'text-xl md:text-2xl';
                $color = !empty($b['styles']['textColor']) ? 'color:' . e($b['styles']['textColor']) . ';' : '';
                $blockHtml .= "<{$lvl} class=\"{$sizeClass} font-extrabold text-[#08111F] mt-2 mb-2 text-left\" style=\"{$color}\">{$contenido}</{$lvl}>";

            } elseif ($tipo === 'separador') {
                $style = $b['styles']['separatorStyle'] ?? 'punto';
                if ($style === 'espaciado') {
                    $blockHtml .= "<div class=\"my-10\"></div>";
                } elseif ($style === 'punto') {
                    $blockHtml .= "<div class=\"flex items-center gap-3 my-6\"><div class=\"flex-1 h-px bg-slate-200\"></div><div class=\"w-1.5 h-1.5 rounded-full bg-[#800A15]\"></div><div class=\"flex-1 h-px bg-slate-200\"></div></div>";
                } else {
                    $blockHtml .= "<hr class=\"my-6 border-t border-slate-200 w-full\" />";
                }

            } elseif ($tipo === 'imagen') {
                $imgSrc = !empty($b['imagen'])
                    ? (str_starts_with($b['imagen'], 'http') ? $b['imagen'] : asset('storage/' . $b['imagen']))
                    : '/Estudiantes COLSIH.png';
                $leyenda = !empty($b['leyenda']) ? '<p class="text-xs text-slate-400 font-semibold mt-2">' . e($b['leyenda']) . '</p>' : '';
                $blockHtml .= "<div class=\"text-left\"><div class=\"rounded-2xl overflow-hidden border border-slate-100\"><img src=\"{$imgSrc}\" class=\"w-full h-auto object-cover\" loading=\"lazy\" /></div>{$leyenda}</div>";

            } elseif ($tipo === 'video') {
                $url = $b['url'] ?? '';
                if (!empty($b['videoFile'])) {
                    $src = asset('storage/' . $b['videoFile']);
                    $blockHtml .= "<div class=\"rounded-2xl overflow-hidden border border-slate-200\"><video src=\"{$src}\" controls class=\"w-full\"></video></div>";
                } elseif ($url) {
                    $embedUrl = $url;
                    if (str_contains($url, 'watch?v='))  $embedUrl = str_replace('watch?v=', 'embed/', $url);
                    elseif (str_contains($url, 'youtu.be/')) $embedUrl = str_replace('youtu.be/', 'youtube.com/embed/', $url);
                    $embedUrl = e($embedUrl);
                    $blockHtml .= "<div class=\"aspect-video rounded-2xl overflow-hidden border border-slate-200\"><iframe src=\"{$embedUrl}\" class=\"w-full h-full\" allowfullscreen></iframe></div>";
                }

            } elseif ($tipo === 'cita') {
                $contenido = e($b['contenido'] ?? '');
                $autor = !empty($b['autor']) ? '<span class="block text-xs font-bold text-blue-600 uppercase tracking-wider mt-3 not-italic">— ' . e($b['autor']) . '</span>' : '';
                $blockHtml .= "<blockquote class=\"bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-2xl italic text-slate-700 text-base font-medium font-sans text-left\">{$contenido}{$autor}</blockquote>";

            } elseif ($tipo === 'ficha') {
                $titulo   = e($b['titulo'] ?? 'Información');
                $itemsRaw = $b['items'] ?? '';
                $items    = array_filter(array_map('trim', explode("\n", $itemsRaw)));
                $listHtml = '';
                foreach ($items as $item) {
                    $listHtml .= "<li class=\"text-xs font-semibold text-slate-600\">" . e($item) . "</li>";
                }
                $blockHtml .= "<div class=\"bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-left space-y-3\">" .
                    "<div class=\"flex items-center gap-2 text-blue-600\"><span class=\"font-extrabold text-sm uppercase tracking-wide\">{$titulo}</span></div>" .
                    "<ul class=\"space-y-2 list-disc list-inside\">{$listHtml}</ul></div>";

            } elseif ($tipo === 'lista') {
                $tituloLista = e($b['titulo'] ?? '');
                $itemsRaw    = $b['items'] ?? '';
                $items       = array_filter(array_map('trim', explode("\n", $itemsRaw)));
                $listHtml    = '';
                foreach ($items as $item) {
                    $listHtml .= "<li class=\"text-sm font-medium text-slate-600\">" . e($item) . "</li>";
                }
                $tituloHtml = $tituloLista ? "<h4 class=\"font-bold text-slate-800 mb-3\">{$tituloLista}</h4>" : '';
                $blockHtml .= "<div class=\"text-left\">{$tituloHtml}<ul class=\"list-disc list-inside space-y-1.5\">{$listHtml}</ul></div>";

            } elseif ($tipo === 'boton') {
                $texto      = e($b['texto']       ?? 'Ver más');
                $url        = e($b['url']         ?? '#');
                $color      = e($b['color']       ?? '#003C8F');
                $textoColor = e($b['texto_color'] ?? '#ffffff');
                $blockHtml .= "<div class=\"text-center my-2\"><a href=\"{$url}\" class=\"inline-block px-8 py-3 rounded-xl font-bold text-sm shadow-md\" style=\"background-color:{$color};color:{$textoColor}\">{$texto}</a></div>";

            } elseif ($tipo === 'espaciador') {
                $altura = (int) ($b['altura'] ?? 40);
                $altura = max(8, min(200, $altura));
                $blockHtml .= "<div style=\"height:{$altura}px\"></div>";
            }

            if ($blockHtml !== '') {
                $html .= "<div class=\"{$widthClass}\">{$blockHtml}</div>";
            }
        }
        $html .= '</div>';
        return $html;
    }

    private function procesarBloques(Request $request, array $bloquesActuales, bool $esDeporte = false): array
    {
        $raw = $request->input('bloques', '[]');
        $bloques = json_decode($raw, true) ?? [];

        // Map de imagenes existentes por clave unica para mantenerlas al editar
        $existentes = [];
        foreach ($bloquesActuales as $b) {
            if (($b['tipo'] ?? '') === 'imagen' && !empty($b['imagen']) && !empty($b['_key'])) {
                $existentes[$b['_key']] = $b['imagen'];
            }
        }

        foreach ($bloques as $idx => &$bloque) {
            $tipo = $bloque['tipo'] ?? '';

            if ($tipo === 'imagen') {
                $fileKey = "img_bloque_{$idx}";
                if ($request->hasFile($fileKey)) {
                    if (!empty($bloque['imagen'])) {
                        ImageOptimizer::eliminar($bloque['imagen']);
                    }
                    $bloque['imagen'] = ImageOptimizer::guardar($request->file($fileKey), $this->carpetaImagen($request->input('categoria', 'noticia'), $esDeporte));
                } elseif (empty($bloque['imagen']) && !empty($bloque['_key']) && isset($existentes[$bloque['_key']])) {
                    $bloque['imagen'] = $existentes[$bloque['_key']];
                }
                unset($bloque['_file_pending']);
            } elseif ($tipo === 'video') {
                $videoKey = "video_bloque_{$idx}";
                if ($request->hasFile($videoKey)) {
                    if (!empty($bloque['videoFile'])) {
                        Storage::disk('public')->delete($bloque['videoFile']);
                    }
                    $videoName = basename($request->file($videoKey)->getClientOriginalName());
                    $bloque['videoFile'] = $request->file($videoKey)->storeAs('noticias/videos', $videoName, 'public');
                    $bloque['url'] = '';
                }
                $posterKey = "poster_bloque_{$idx}";
                if ($request->hasFile($posterKey)) {
                    if (!empty($bloque['poster'])) {
                        ImageOptimizer::eliminar($bloque['poster']);
                    }
                    $bloque['poster'] = ImageOptimizer::guardar($request->file($posterKey), $this->carpetaImagen($request->input('categoria', 'noticia'), $esDeporte));
                }
            }
        }
        unset($bloque);

        return $bloques;
    }
}
