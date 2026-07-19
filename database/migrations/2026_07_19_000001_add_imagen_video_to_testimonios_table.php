<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('testimonios', function (Blueprint $table) {
            $table->string('imagen')->nullable()->after('texto');
            $table->string('video_url')->nullable()->after('imagen');
        });
    }

    public function down(): void
    {
        Schema::table('testimonios', function (Blueprint $table) {
            $table->dropColumn(['imagen', 'video_url']);
        });
    }
};
