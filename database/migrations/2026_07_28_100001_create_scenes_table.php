<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scenes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained()->cascadeOnDelete();
            $table->string('nombre');
            $table->string('slug');
            $table->string('imagen_path');          // ruta relativa en storage/public
            $table->decimal('yaw_inicial', 8, 4)->default(0);
            $table->decimal('pitch_inicial', 8, 4)->default(0);
            $table->decimal('hfov_inicial', 6, 2)->default(100);
            $table->boolean('es_escena_inicial')->default(false);
            $table->unsignedSmallInteger('orden')->default(0);
            $table->timestamps();

            $table->unique(['tour_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scenes');
    }
};
