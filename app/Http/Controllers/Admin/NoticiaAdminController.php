<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
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
            'noticias'    => Noticia::latest()->get(['id', 'titulo', 'slug', 'resumen', 'imagen', 'bloques', 'categoria', 'activo', 'publicado_en']),
            'preguntas'   => [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:500',
            'categoria'    => 'required|in:noticia,evento,comunicado',
            'activo'       => 'nullable',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|image|max:6144',
        ]);

        $data = $request->only(['titulo', 'resumen', 'categoria', 'publicado_en']);
        $data['activo']       = $request->boolean('activo');
        $data['publicado_en'] = $data['publicado_en'] ?: now()->toDateTimeString();
        $data['contenido']    = '';
        $data['slug']         = $this->uniqueSlug(Str::slug($data['titulo']));

        if ($request->hasFile('portada')) {
            $data['imagen'] = $request->file('portada')->store('noticias/portadas', 'public');
        }

        $data['bloques'] = $this->procesarBloques($request, []);
        $data['contenido'] = $this->compileBlocksToHtml($data['bloques']);

        Noticia::create($data);
        return back()->with('flash', 'Publicacion creada.');
    }

    public function update(Request $request, Noticia $noticia)
    {
        $request->validate([
            'titulo'       => 'required|string|max:200',
            'resumen'      => 'nullable|string|max:500',
            'categoria'    => 'required|in:noticia,evento,comunicado',
            'activo'       => 'nullable',
            'publicado_en' => 'nullable|date',
            'portada'      => 'nullable|image|max:6144',
        ]);

        $data = $request->only(['titulo', 'resumen', 'categoria', 'publicado_en']);
        $data['activo']       = $request->boolean('activo');
        $data['publicado_en'] = $data['publicado_en'] ?: ($noticia->publicado_en?->toDateTimeString() ?? now()->toDateTimeString());

        if ($request->hasFile('portada')) {
            if ($noticia->imagen) {
                Storage::disk('public')->delete($noticia->imagen);
            }
            $data['imagen'] = $request->file('portada')->store('noticias/portadas', 'public');
        }

        $data['bloques'] = $this->procesarBloques($request, $noticia->bloques ?? []);
        $data['contenido'] = $this->compileBlocksToHtml($data['bloques']);

        $noticia->update($data);
        return back()->with('flash', 'Publicacion actualizada.');
    }

    public function destroy(Noticia $noticia)
    {
        if ($noticia->imagen) {
            Storage::disk('public')->delete($noticia->imagen);
        }
        if ($noticia->bloques) {
            foreach ($noticia->bloques as $b) {
                if (($b['tipo'] ?? '') === 'imagen' && !empty($b['imagen'])) {
                    Storage::disk('public')->delete($b['imagen']);
                }
            }
        }
        $noticia->forceDelete();
        return back()->with('flash', 'Publicacion eliminada.');
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
            $tipo = $b['tipo'] ?? 'texto';
            $width = $b['width'] ?? 'completo';
            
            $widthClass = 'w-full px-3 my-4';
            if ($width === 'estrecho') {
                $widthClass = 'w-full md:w-1/3 px-3 my-4';
            } elseif ($width === 'mediano') {
                $widthClass = 'w-full md:w-1/2 px-3 my-4';
            }
            
            $blockHtml = '';
            
            if ($tipo === 'texto') {
                $contenido = e($b['contenido'] ?? '');
                
                // Formato styles
                $styles = [];
                if (!empty($b['formato']['bold'])) $styles[] = 'font-bold';
                if (!empty($b['formato']['italic'])) $styles[] = 'italic';
                if (!empty($b['formato']['underline'])) $styles[] = 'underline';
                
                $sizeClass = 'text-base';
                if (($b['formato']['size'] ?? '') === 'grande') $sizeClass = 'text-lg md:text-xl font-bold';
                if (($b['formato']['size'] ?? '') === 'muy-grande') $sizeClass = 'text-2xl md:text-3xl font-extrabold';
                
                $colorClass = 'text-slate-600';
                if (($b['formato']['color'] ?? '') === 'rojo') $colorClass = 'text-[#800A15]';
                if (($b['formato']['color'] ?? '') === 'azul') $colorClass = 'text-[#003C8F]';
                
                $blockHtml .= "<p class=\"{$sizeClass} {$colorClass} " . implode(' ', $styles) . " leading-relaxed text-left\">{$contenido}</p>";
            } elseif ($tipo === 'titulo') {
                $contenido = e($b['contenido'] ?? '');
                $blockHtml .= "<h3 class=\"text-xl md:text-2xl font-extrabold text-[#08111F] mt-2 mb-2 text-left\">{$contenido}</h3>";
            } elseif ($tipo === 'separador') {
                $blockHtml .= "<hr class=\"my-4 border-t border-slate-100 w-full\" />";
            } elseif ($tipo === 'imagen') {
                $imgSrc = !empty($b['imagen']) ? asset('storage/' . $b['imagen']) : '/Estudiantes COLSIH.png';
                $leyenda = !empty($b['leyenda']) ? '<p class="text-xs text-slate-400 font-semibold mt-2">' . e($b['leyenda']) . '</p>' : '';
                $blockHtml .= "<div class=\"text-left\"><div class=\"rounded-2xl overflow-hidden border border-slate-100\"><img src=\"{$imgSrc}\" class=\"w-full h-auto object-cover\" /></div>{$leyenda}</div>";
            } elseif ($tipo === 'video') {
                $url = $b['url'] ?? '';
                if ($url) {
                    $embedUrl = $url;
                    if (str_contains($url, 'watch?v=')) {
                        $embedUrl = str_replace('watch?v=', 'embed/', $url);
                    } elseif (str_contains($url, 'youtu.be/')) {
                        $embedUrl = str_replace('youtu.be/', 'youtube.com/embed/', $url);
                    }
                    $blockHtml .= "<div class=\"aspect-video rounded-2xl overflow-hidden border border-slate-200\"><iframe src=\"{$embedUrl}\" class=\"w-full h-full\" allowfullscreen></iframe></div>";
                }
            } elseif ($tipo === 'cita') {
                $contenido = e($b['contenido'] ?? '');
                $autor = !empty($b['autor']) ? '<span class="block text-xs font-bold text-blue-600 uppercase tracking-wider mt-3 not-italic">— ' . e($b['autor']) . '</span>' : '';
                $blockHtml .= "<blockquote class=\"bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-2xl italic text-slate-700 text-base font-medium font-sans text-left\">{$contenido}{$autor}</blockquote>";
            } elseif ($tipo === 'ficha') {
                $titulo = e($b['titulo'] ?? 'Información');
                $itemsRaw = $b['items'] ?? '';
                $items = array_filter(array_map('trim', explode("\n", $itemsRaw)));
                $listHtml = '';
                foreach ($items as $item) {
                    $listHtml .= "<li>" . e($item) . "</li>";
                }
                $blockHtml .= "<div class=\"bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-left space-y-3\"><div class=\"flex items-center gap-2 text-blue-600\"><span class=\"font-extrabold text-sm uppercase tracking-wide\">{$titulo}</span></div><ul class=\"space-y-2 text-xs font-semibold text-slate-600 list-disc list-inside\">{$listHtml}</ul></div>";
            }

            if ($blockHtml !== '') {
                $html .= "<div class=\"{$widthClass}\">{$blockHtml}</div>";
            }
        }
        $html .= '</div>';
        return $html;
    }

    private function procesarBloques(Request $request, array $bloquesActuales): array
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
            if (($bloque['tipo'] ?? '') !== 'imagen') {
                continue;
            }

            $fileKey = "img_bloque_{$idx}";
            if ($request->hasFile($fileKey)) {
                // Si habia imagen previa para este bloque, borrarla
                if (!empty($bloque['imagen'])) {
                    Storage::disk('public')->delete($bloque['imagen']);
                }
                $bloque['imagen'] = $request->file($fileKey)->store('noticias/bloques', 'public');
            } elseif (empty($bloque['imagen']) && !empty($bloque['_key']) && isset($existentes[$bloque['_key']])) {
                // Conservar imagen existente
                $bloque['imagen'] = $existentes[$bloque['_key']];
            }

            unset($bloque['_file_pending']);
        }
        unset($bloque);

        return $bloques;
    }
}
