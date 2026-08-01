<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipo_members', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('cargo');
            $table->string('area');
            $table->string('tipo')->default('docente'); // 'directivo' o 'docente'
            $table->string('foto')->nullable();
            $table->integer('foto_posicion')->default(20); // porcentaje Y: 0..100
            $table->integer('foto_zoom')->default(100); // porcentaje escala: 100..250
            $table->integer('orden')->default(0);
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipo_members');
    }
};
