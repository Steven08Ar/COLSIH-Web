<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('visitas_web')) {
            Schema::create('visitas_web', function (Blueprint $table) {
                $table->id();
                $table->string('ruta')->index();
                $table->string('ip_hash', 64)->nullable()->index();
                $table->string('dispositivo', 20)->default('desktop')->index();
                $table->string('navegador', 50)->nullable();
                $table->string('referente', 255)->nullable();
                $table->string('session_id', 100)->nullable()->index();
                $table->timestamps();
                $table->index('created_at');
            });
        }

        if (Schema::hasTable('noticias') && !Schema::hasColumn('noticias', 'vistas')) {
            Schema::table('noticias', function (Blueprint $table) {
                $table->unsignedBigInteger('vistas')->default(0)->after('activo');
            });
        }

        if (Schema::hasTable('testimonios') && !Schema::hasColumn('testimonios', 'vistas')) {
            Schema::table('testimonios', function (Blueprint $table) {
                $table->unsignedBigInteger('vistas')->default(0)->after('activo');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('visitas_web');

        if (Schema::hasTable('noticias') && Schema::hasColumn('noticias', 'vistas')) {
            Schema::table('noticias', function (Blueprint $table) {
                $table->dropColumn('vistas');
            });
        }

        if (Schema::hasTable('testimonios') && Schema::hasColumn('testimonios', 'vistas')) {
            Schema::table('testimonios', function (Blueprint $table) {
                $table->dropColumn('vistas');
            });
        }
    }
};
