<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Tour extends Model
{
    protected $fillable = ['nombre', 'slug', 'descripcion', 'activo', 'en_construccion'];

    protected $casts = [
        'activo' => 'boolean',
        'en_construccion' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Tour $tour) {
            if (empty($tour->slug)) {
                $tour->slug = Str::slug($tour->nombre);
            }
        });
    }

    public function scenes(): HasMany
    {
        return $this->hasMany(Scene::class)->orderBy('orden')->orderBy('id');
    }

    public function escenaInicial(): HasOne
    {
        return $this->hasOne(Scene::class)->where('es_escena_inicial', true);
    }
}
