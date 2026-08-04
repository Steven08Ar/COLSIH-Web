<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ImageOptimizer
{
    public const CALIDAD_JPG = 85;
    public const LADO_NORMAL = 1920;
    public const LADO_360    = 8192;

    /**
     * Optimiza la imagen y la guarda en Cloudflare R2 (si está configurado) o en
     * el disco público local como fallback. Devuelve la URL pública completa (R2)
     * o la ruta relativa dentro de storage/app/public (local).
     */
    public static function guardar(
        UploadedFile $file,
        string $carpeta,
        int $ladoMaximo = self::LADO_NORMAL
    ): string {
        $ext = strtolower($file->getClientOriginalExtension());
        $ext = in_array($ext, ['jpeg', 'heic', 'heif']) ? 'jpg' : $ext;
        if (!in_array($ext, ['jpg', 'png', 'webp', 'gif'])) {
            $ext = 'jpg';
        }

        $nombre = Str::random(40) . '.' . $ext;
        $ruta   = $carpeta . '/' . $nombre;

        $manager = new ImageManager(new Driver());
        $imagen  = $manager->read($file->getPathname());
        $imagen->orient();

        if ($imagen->width() > $ladoMaximo || $imagen->height() > $ladoMaximo) {
            $imagen->scaleDown($ladoMaximo, $ladoMaximo);
        }

        if ($ext === 'png') {
            $contenido = (string) $imagen->toPng();
            $mime      = 'image/png';
        } elseif ($ext === 'gif') {
            $contenido = (string) $imagen->toGif();
            $mime      = 'image/gif';
        } elseif ($ext === 'webp') {
            $contenido = (string) $imagen->toWebp(self::CALIDAD_JPG);
            $mime      = 'image/webp';
        } else {
            $contenido = (string) $imagen->toJpeg(self::CALIDAD_JPG);
            $mime      = 'image/jpeg';
        }

        // Subir a Cloudflare R2 si está configurado
        if (env('R2_ACCESS_KEY_ID') && env('R2_ENDPOINT')) {
            Storage::disk('r2')->put($ruta, $contenido, ['ContentType' => $mime]);
            return rtrim(env('R2_PUBLIC_URL', ''), '/') . '/' . $ruta;
        }

        // Fallback: guardar en disco público local
        Storage::disk('public')->makeDirectory($carpeta);
        file_put_contents(Storage::disk('public')->path($ruta), $contenido);
        return $ruta;
    }

    /**
     * Sube el archivo original sin ninguna optimización ni recompresión.
     * Usado para imágenes 360° donde la pérdida de calidad es inaceptable.
     */
    public static function guardarRaw(UploadedFile $file, string $carpeta): string
    {
        $ext    = strtolower($file->getClientOriginalExtension()) ?: 'jpg';
        $nombre = Str::random(40) . '.' . $ext;
        $ruta   = $carpeta . '/' . $nombre;
        $mime   = $file->getMimeType() ?: 'image/jpeg';

        $contenido = file_get_contents($file->getPathname());

        if (env('R2_ACCESS_KEY_ID') && env('R2_ENDPOINT')) {
            Storage::disk('r2')->put($ruta, $contenido, ['ContentType' => $mime]);
            return rtrim(env('R2_PUBLIC_URL', ''), '/') . '/' . $ruta;
        }

        Storage::disk('public')->makeDirectory($carpeta);
        file_put_contents(Storage::disk('public')->path($ruta), $contenido);
        return $ruta;
    }

    /**
     * Elimina una imagen de R2 (URL completa) o del disco público local (ruta relativa).
     */
    public static function eliminar(?string $ruta): void
    {
        if (!$ruta) return;

        if (str_starts_with($ruta, 'http')) {
            $base = rtrim(env('R2_PUBLIC_URL', ''), '/');
            if ($base && str_starts_with($ruta, $base)) {
                $relPath = ltrim(substr($ruta, strlen($base)), '/');
                Storage::disk('r2')->delete($relPath);
            }
        } else {
            Storage::disk('public')->delete($ruta);
        }
    }
}
