<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreguntaFrecuente extends Model
{
    protected $fillable = ['pregunta', 'respuesta', 'activo', 'orden'];

    protected $casts = ['activo' => 'boolean'];

    public function scopeActivas($query)
    {
        return $query->where('activo', true)->orderBy('orden')->orderBy('id');
    }
}
