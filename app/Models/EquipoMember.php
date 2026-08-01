<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipoMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'cargo',
        'area',
        'tipo',
        'foto',
        'foto_posicion',
        'foto_posicion_x',
        'foto_posicion_y',
        'foto_zoom',
        'orden',
        'activo',
    ];

    protected $casts = [
        'foto_posicion' => 'integer',
        'foto_posicion_x' => 'integer',
        'foto_posicion_y' => 'integer',
        'foto_zoom' => 'integer',
        'orden' => 'integer',
        'activo' => 'boolean',
    ];
}
