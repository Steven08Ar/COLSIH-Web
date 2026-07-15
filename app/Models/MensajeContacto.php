<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MensajeContacto extends Model
{
    protected $table = 'mensajes_contacto';

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'asunto',
        'mensaje',
        'leido',
        'leido_en',
    ];

    protected $casts = [
        'leido' => 'boolean',
        'leido_en' => 'datetime',
    ];

    public function marcarLeido(): void
    {
        $this->update([
            'leido' => true,
            'leido_en' => now(),
        ]);
    }
}

