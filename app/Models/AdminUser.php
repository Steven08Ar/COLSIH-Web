<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class AdminUser extends Model
{
    protected $table = 'admin_users';

    const ROLES = [
        'admin'     => 'Administrador',
        'deportes'  => 'Deportes',
        'marketing' => 'Marketing',
    ];

    protected $fillable = [
        'nombre',
        'usuario',
        'clave',
        'email',
        'contacto',
        'foto',
        'rol',
        'activo',
    ];

    protected $hidden = ['clave'];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function verificarClave(string $clave): bool
    {
        return Hash::check($clave, $this->clave);
    }
}
