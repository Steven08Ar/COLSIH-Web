<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TorneoPartido extends Model
{
    use HasFactory;

    protected $table = 'torneo_partidos';

    protected $fillable = [
        'fase',
        'posicion_llave',
        'equipo_local',
        'equipo_visitante',
        'escudo_local',
        'escudo_visitante',
        'goles_local',
        'goles_visitante',
        'ganador',
        'estado',
        'fecha_partido',
    ];

    protected $casts = [
        'posicion_llave'  => 'integer',
        'goles_local'     => 'integer',
        'goles_visitante' => 'integer',
    ];
}
