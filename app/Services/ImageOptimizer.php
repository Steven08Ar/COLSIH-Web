<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ImageOptimizer
{
    const CALIDAD_JPG    = 85;
    const LADO_NORMAL    = 1920;  // testimonios, noticias, etc.
    const LADO_360       = 8192;  // panoramas 360° — no recortar demasiado

    /**
     * Comprime, orienta y guarda una imagen subida.
     * Devuelve la ruta relativa dentro del disco 'public', igual que ->store().
     *
     * @param  UploadedFile $file
     * @param  string       $carpeta    Subcarpeta dentro de storage/app/public/
     * @param  int          $ladoMaximo Píxeles máximos del lado más largo
     */
    public static function guardar(
        UploadedFile $file,
        string $carpeta,
        int $ladoMaximo = self::LADO_NORMAL
    ): string {
        // Normalizar extensión de salida (HEIC/HEIF → JPG)
        $ext = strtolower($file->getClientOriginalExtension());
        $ext = in_array($ext, ['jpeg', 'heic', 'heif']) ? 'jpg' : $ext;
        if (!in_array($ext, ['jpg', 'png', 'webp', 'gif'])) {
            $ext = 'jpg';
        }

        $nombre       = Str::random(40) . '.' . $ext;
        $ruta         = $carpeta . '/' . $nombre;
        $rutaAbsoluta = Storage::disk('public')->path($ruta);

        Storage::disk('public')->makeDirectory($carpeta);

        $manager = new ImageManager(new Driver());
        $imagen  = $manager->read($file->getPathname());

        // Corregir rotación EXIF (fotos tomadas con celular en vertical)
        $imagen->orient();

        // Escalar solo si supera el límite máximo
        if ($imagen->width() > $ladoMaximo || $imagen->height() > $ladoMaximo) {
            $imagen->scaleDown($ladoMaximo, $ladoMaximo);
        }

        // Guardar con compresión según formato
        if ($ext === 'png') {
            $imagen->toPng()->save($rutaAbsoluta);
        } elseif ($ext === 'gif') {
            $imagen->toGif()->save($rutaAbsoluta);
        } else {
            $imagen->toJpeg(self::CALIDAD_JPG)->save($rutaAbsoluta);
        }

        return $ruta;
    }
}
