<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Noticia extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'titulo',
        'slug',
        'resumen',
        'contenido',
        'imagen',
        'categoria',
        'activo',
        'publicado_en',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'publicado_en' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Noticia $noticia) {
            if (empty($noticia->slug)) {
                $noticia->slug = Str::slug($noticia->titulo);
            }
        });
    }

    public function scopePublicadas($query)
    {
        return $query->where('activo', true)
            ->whereNotNull('publicado_en')
            ->where('publicado_en', '<=', now());
    }

    public function getImagenUrlAttribute(): ?string
    {
        return $this->imagen ? asset('storage/' . $this->imagen) : null;
    }
}

