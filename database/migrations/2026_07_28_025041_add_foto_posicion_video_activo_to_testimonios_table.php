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
        Schema::table('testimonios', function (Blueprint $table) {
            $table->decimal('foto_posicion', 5, 2)->default(50.00)->after('imagen');
            $table->boolean('video_activo')->default(false)->after('video_url');
        });
    }

    public function down(): void
    {
        Schema::table('testimonios', function (Blueprint $table) {
            $table->dropColumn(['foto_posicion', 'video_activo']);
        });
    }
};
