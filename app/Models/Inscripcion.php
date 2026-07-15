<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inscripcion extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'estudiante_nombres',
        'estudiante_apellidos',
        'estudiante_fecha_nacimiento',
        'estudiante_genero',
        'estudiante_tipo_documento',
        'estudiante_numero_documento',
        'grado_solicitado',
        'jornada',
        'acudiente_nombres',
        'acudiente_apellidos',
        'acudiente_tipo_documento',
        'acudiente_numero_documento',
        'acudiente_parentesco',
        'acudiente_telefono',
        'acudiente_email',
        'acudiente_direccion',
        'estado',
        'observaciones',
        'valor_inscripcion',
        'referencia_pago',
        'estado_pago',
        'fecha_pago',
    ];

    protected $casts = [
        'estudiante_fecha_nacimiento' => 'date',
        'fecha_pago' => 'datetime',
        'valor_inscripcion' => 'decimal:2',
    ];

    public function getNombreCompletoEstudianteAttribute(): string
    {
        return "{$this->estudiante_nombres} {$this->estudiante_apellidos}";
    }

    public function getNombreCompletoAcudienteAttribute(): string
    {
        return "{$this->acudiente_nombres} {$this->acudiente_apellidos}";
    }

    public function estaPagada(): bool
    {
        return $this->estado === 'pago_completado';
    }
}

