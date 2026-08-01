<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('equipo_members', function (Blueprint $table) {
            if (!Schema::hasColumn('equipo_members', 'foto_posicion_x')) {
                $table->integer('foto_posicion_x')->default(50)->after('foto');
            }
            if (!Schema::hasColumn('equipo_members', 'foto_posicion_y')) {
                $table->integer('foto_posicion_y')->default(20)->after('foto_posicion_x');
            }
        });
    }

    public function down(): void
    {
        Schema::table('equipo_members', function (Blueprint $table) {
            $table->dropColumn(['foto_posicion_x', 'foto_posicion_y']);
        });
    }
};
