<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonio extends Model
{
    protected $fillable = ['nombre', 'cargo', 'texto', 'imagen', 'foto_posicion', 'video_url', 'video_activo', 'avatar', 'activo', 'orden'];

    protected $casts = ['activo' => 'boolean', 'video_activo' => 'boolean', 'foto_posicion' => 'decimal:2'];

    public function scopeActivos($query)
    {
        return $query->where('activo', true)->orderBy('orden')->orderBy('id');
    }
}
