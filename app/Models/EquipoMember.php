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
        'foto_zoom',
        'orden',
        'activo',
    ];

    protected $casts = [
        'foto_posicion' => 'integer',
        'foto_zoom' => 'integer',
        'orden' => 'integer',
        'activo' => 'boolean',
    ];
}
