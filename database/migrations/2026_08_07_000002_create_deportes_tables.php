<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('torneo_partidos', function (Blueprint $table) {
            $table->id();
            $table->string('fase'); // 'cuartos', 'semifinal', 'final'
            $table->integer('posicion_llave'); // 1, 2, 3...
            $table->string('equipo_local')->default('Por definir');
            $table->string('equipo_visitante')->default('Por definir');
            $table->string('escudo_local')->nullable();
            $table->string('escudo_visitante')->nullable();
            $table->integer('goles_local')->nullable();
            $table->integer('goles_visitante')->nullable();
            $table->string('ganador')->nullable(); // 'local', 'visitante'
            $table->string('estado')->default('programado'); // 'programado', 'finalizado'
            $table->string('fecha_partido')->nullable();
            $table->timestamps();
        });

        Schema::create('deportes_carrusel', function (Blueprint $table) {
            $table->id();
            $table->string('tag')->default('Deportes COLSIH');
            $table->string('subtitulo')->nullable();
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->string('imagen')->nullable();
            $table->integer('orden')->default(0);
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('torneo_partidos');
        Schema::dropIfExists('deportes_carrusel');
    }
};
