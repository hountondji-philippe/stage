<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('etudiants_autorises', function (Blueprint $table) {
            $table->boolean('annee_validee')->default(false)->after('compte_active');
            $table->timestamp('annee_validee_le')->nullable()->after('annee_validee');
        });
    }

    public function down(): void
    {
        Schema::table('etudiants_autorises', function (Blueprint $table) {
            $table->dropColumn(['annee_validee', 'annee_validee_le']);
        });
    }
};