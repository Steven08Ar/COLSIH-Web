<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hotspots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scene_id')->constrained()->cascadeOnDelete();
            $table->enum('tipo', ['enlace', 'info']);
            $table->decimal('yaw', 9, 4);
            $table->decimal('pitch', 9, 4);
            $table->string('texto')->nullable();
            // null = hotspot de tipo info o sin destino explícito
            $table->foreignId('scene_destino_id')
                  ->nullable()
                  ->constrained('scenes')
                  ->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotspots');
    }
};
