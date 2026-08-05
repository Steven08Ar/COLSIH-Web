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
        Schema::create('carnets', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->comment('Código de Barras del Carnet');
            $table->string('nfc')->nullable()->unique()->comment('UID / Código de la Tarjeta NFC');
            $table->string('nombre');
            $table->string('apellido');
            $table->string('rol')->default('Estudiante'); // Estudiante, Docente, Administrativo, Visitante
            $table->string('info')->nullable();
            $table->string('foto')->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carnets');
    }
};
