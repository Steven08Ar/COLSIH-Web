<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class OptimizeTourImages extends Command
{
    protected $signature = 'tour:optimize-images
                            {source : Ruta de las imágenes originales (absoluta, o relativa a la raíz del proyecto)}
                            {--output=tours : Subcarpeta destino dentro de storage/app/public}
                            {--max-width=4096 : Ancho máximo en píxeles (alto se ajusta automáticamente)}
                            {--quality=82 : Calidad JPEG (1-100)}
                            {--force : Sobreescribir imágenes ya optimizadas}';

    protected $description = 'Optimiza imágenes equirectangulares 360° (2:1) para el recorrido virtual';

    private const RATIO_TARGET     = 2.0;
    private const RATIO_TOLERANCE  = 0.05; // ±5 %

    public function handle(): int
    {
        $sourcePath = $this->resolveSourcePath($this->argument('source'));
        $outputDir  = trim($this->option('output'), '/');
        $maxWidth   = (int) $this->option('max-width');
        $quality    = max(1, min(100, (int) $this->option('quality')));
        $force      = (bool) $this->option('force');

        if (! $sourcePath) {
            $this->error('Carpeta origen no encontrada. Rutas intentadas:');
            $this->line('  · ' . base_path($this->argument('source')));
            $this->line('  · ' . storage_path('app/' . $this->argument('source')));
            $this->line('  · ' . public_path($this->argument('source')));
            return self::FAILURE;
        }

        $files = collect(glob($sourcePath . '/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}', GLOB_BRACE))
            ->filter(fn ($f) => is_file($f))
            ->values();

        if ($files->isEmpty()) {
            $this->warn("No se encontraron imágenes en: {$sourcePath}");
            return self::SUCCESS;
        }

        Storage::disk('public')->makeDirectory($outputDir);
        $manager = new ImageManager(new Driver());

        $this->info("Procesando {$files->count()} archivos desde: {$sourcePath}");
        $this->newLine();

        $procesadas = $saltadas = $omitidas = 0;
        $bar = $this->output->createProgressBar($files->count());
        $bar->start();

        foreach ($files as $file) {
            $basename = pathinfo($file, PATHINFO_FILENAME);
            $destRel  = "{$outputDir}/{$basename}.jpg";
            $destAbs  = Storage::disk('public')->path($destRel);

            if (! $force && file_exists($destAbs)) {
                $omitidas++;
                $bar->advance();
                continue;
            }

            $img    = $manager->read($file);
            $width  = $img->width();
            $height = $img->height();

            if ($height === 0) {
                $this->newLine();
                $this->warn("  ⚠  '{$basename}': imagen inválida (alto = 0), omitida.");
                $saltadas++;
                $bar->advance();
                continue;
            }

            $ratio = $width / $height;
            if (abs($ratio - self::RATIO_TARGET) > self::RATIO_TOLERANCE) {
                $this->newLine();
                $this->warn(sprintf(
                    "  ⚠  '%s' omitida — proporción %.2f:1 (se espera 2:1 ±%.0f%%)",
                    $basename,
                    $ratio,
                    self::RATIO_TOLERANCE * 100
                ));
                $saltadas++;
                $bar->advance();
                continue;
            }

            if ($width > $maxWidth) {
                $img->scaleDown(width: $maxWidth);
            }

            @mkdir(dirname($destAbs), 0755, true);
            $img->toJpeg(quality: $quality)->save($destAbs);

            $procesadas++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->table(
            ['Estado', 'Cantidad'],
            [
                ['✅ Optimizadas y guardadas',  $procesadas],
                ['⚠  Proporción incorrecta',    $saltadas],
                ['⏭  Ya existían (--force omite)', $omitidas],
            ]
        );

        if ($procesadas > 0) {
            $this->info("Ruta storage:  storage/app/public/{$outputDir}/");
            $this->info("URL pública:   /storage/{$outputDir}/nombre-archivo.jpg");
            $this->newLine();
            $this->line("Agrega las escenas desde el panel admin o con el seeder:");
            $this->line("  php artisan db:seed --class=TourSeeder");
        }

        return self::SUCCESS;
    }

    private function resolveSourcePath(string $source): ?string
    {
        // 1. Ruta absoluta
        if (is_dir($source)) {
            return rtrim($source, '/\\');
        }

        // 2. Relativa a la raíz del proyecto
        $try = base_path($source);
        if (is_dir($try)) {
            return $try;
        }

        // 3. Relativa a storage/app
        $try = storage_path('app/' . $source);
        if (is_dir($try)) {
            return $try;
        }

        // 4. Relativa a public/
        $try = public_path($source);
        if (is_dir($try)) {
            return $try;
        }

        return null;
    }
}
