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
        if (empty($this->imagen_path)) {
            return asset('recorrido_virtual/1.entrada.jpg');
        }
        if (str_starts_with($this->imagen_path, 'http://') || str_starts_with($this->imagen_path, 'https://') || str_starts_with($this->imagen_path, '/')) {
            return $this->imagen_path;
        }
        if (str_starts_with($this->imagen_path, 'recorrido_virtual/')) {
            return asset($this->imagen_path);
        }
        return asset('storage/' . $this->imagen_path);
    }
}
