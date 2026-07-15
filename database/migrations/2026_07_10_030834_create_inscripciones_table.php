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
        Schema::create('inscripciones', function (Blueprint $table) {
            $table->id();

            // Datos del estudiante
            $table->string('estudiante_nombres');
            $table->string('estudiante_apellidos');
            $table->date('estudiante_fecha_nacimiento');
            $table->enum('estudiante_genero', ['masculino', 'femenino', 'otro']);
            $table->enum('estudiante_tipo_documento', ['ti', 'rc', 'pasaporte']);
            $table->string('estudiante_numero_documento');
            $table->string('grado_solicitado');
            $table->enum('jornada', ['manana', 'tarde', 'unica'])->default('manana');

            // Datos del acudiente / responsable
            $table->string('acudiente_nombres');
            $table->string('acudiente_apellidos');
            $table->enum('acudiente_tipo_documento', ['cc', 'ce', 'pasaporte']);
            $table->string('acudiente_numero_documento');
            $table->string('acudiente_parentesco');
            $table->string('acudiente_telefono');
            $table->string('acudiente_email');
            $table->string('acudiente_direccion');

            // Control de proceso
            $table->enum('estado', [
                'pendiente',
                'en_revision',
                'aprobada',
                'rechazada',
                'pago_pendiente',
                'pago_completado',
            ])->default('pendiente');

            $table->text('observaciones')->nullable();

            // Pago — se completa al integrar pasarela
            $table->decimal('valor_inscripcion', 10, 2)->nullable();
            $table->string('referencia_pago')->nullable()->unique();
            $table->string('estado_pago')->nullable();
            $table->timestamp('fecha_pago')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripciones');
    }
};
