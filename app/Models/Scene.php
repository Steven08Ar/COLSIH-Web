<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Scene extends Model
{
    protected $fillable = [
        'tour_id', 'nombre', 'slug', 'imagen_path',
        'yaw_inicial', 'pitch_inicial', 'hfov_inicial',
        'es_escena_inicial', 'orden',
    ];

    protected $casts = [
        'yaw_inicial'       => 'float',
        'pitch_inicial'     => 'float',
        'hfov_inicial'      => 'float',
        'es_escena_inicial' => 'boolean',
    ];

    // imagen_url se serializa automáticamente en JSON (para Inertia / Blade @json)
    protected $appends = ['imagen_url'];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    public function hotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class);
    }

    public function getImagenUrlAttribute(): string
    {
        $path = $this->imagen_path;

        if (empty($path)) {
            return asset('recorrido_virtual/1.entrada.jpg');
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $cleanPath = ltrim(str_replace('recorrido_virtual/', '', $path), '/');

        // Check exact match in public/recorrido_virtual/
        if (file_exists(public_path('recorrido_virtual/' . $cleanPath))) {
            return asset('recorrido_virtual/' . $cleanPath);
        }

        // Check in public/storage/
        if (file_exists(public_path('storage/' . $cleanPath))) {
            return asset('storage/' . $cleanPath);
        }

        // Fuzzy match in public/recorrido_virtual/ by keyword (e.g. "entrada", "patio", "biblioteca")
        $baseName = pathinfo($cleanPath, PATHINFO_FILENAME);
        $parts = array_filter(explode('.', $baseName));
        $searchKey = end($parts) ?: $baseName;

        if (!empty($searchKey) && strlen($searchKey) >= 3) {
            $matches = glob(public_path('recorrido_virtual/*' . $searchKey . '*'));
            if (!empty($matches)) {
                $foundFile = basename($matches[0]);
                return asset('recorrido_virtual/' . $foundFile);
            }
        }

        return asset('recorrido_virtual/1.entrada.jpg');
    }
}
