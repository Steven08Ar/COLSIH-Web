<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('noticias', function (Blueprint $table) {
            $table->string('seccion')->default('general')->after('categoria');
            $table->boolean('es_deporte')->default(false)->after('seccion');
        });
    }

    public function down(): void
    {
        Schema::table('noticias', function (Blueprint $table) {
            $table->dropColumn(['seccion', 'es_deporte']);
        });
    }
};
