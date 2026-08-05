<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carnet extends Model
{
    protected $fillable = [
        'code',
        'nfc',
        'nombre',
        'apellido',
        'rol',
        'info',
        'foto',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}
