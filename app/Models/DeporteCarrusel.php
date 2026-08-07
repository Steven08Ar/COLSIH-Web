<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeporteCarrusel extends Model
{
    use HasFactory;

    protected $table = 'deportes_carrusel';

    protected $fillable = [
        'tag',
        'subtitulo',
        'titulo',
        'descripcion',
        'imagen',
        'orden',
        'activo',
    ];

    protected $casts = [
        'orden'  => 'integer',
        'activo' => 'boolean',
    ];
}
