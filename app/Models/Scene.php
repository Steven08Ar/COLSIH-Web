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
            return '';
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $ltrimPath = ltrim($path, '/');

        // 1. Check in public/storage/ (Direct upload path e.g. storage/recorrido_virtual/xyz.jpg)
        if (file_exists(public_path('storage/' . $ltrimPath))) {
            return asset('storage/' . $ltrimPath);
        }

        // 2. Check directly in public folder
        if (file_exists(public_path($ltrimPath))) {
            return asset($ltrimPath);
        }

        // 3. Clean path check in public/recorrido_virtual/
        $cleanPath = ltrim(str_replace('recorrido_virtual/', '', $ltrimPath), '/');

        if (file_exists(public_path('recorrido_virtual/' . $cleanPath))) {
            return asset('recorrido_virtual/' . $cleanPath);
        }

        if (file_exists(public_path('storage/' . $cleanPath))) {
            return asset('storage/' . $cleanPath);
        }

        return asset('storage/' . $ltrimPath);
    }
}
