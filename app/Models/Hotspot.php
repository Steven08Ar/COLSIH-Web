<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hotspot extends Model
{
    protected $fillable = [
        'scene_id', 'tipo', 'yaw', 'pitch', 'texto', 'scene_destino_id',
    ];

    protected $casts = [
        'yaw'   => 'float',
        'pitch' => 'float',
    ];

    public function scene(): BelongsTo
    {
        return $this->belongsTo(Scene::class);
    }

    // Solo para hotspots de tipo 'enlace'
    public function sceneDestino(): BelongsTo
    {
        return $this->belongsTo(Scene::class, 'scene_destino_id');
    }
}
