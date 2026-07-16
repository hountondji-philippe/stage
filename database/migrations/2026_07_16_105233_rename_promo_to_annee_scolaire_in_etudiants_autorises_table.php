<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('etudiants_autorises', function (Blueprint $table) {
            $table->renameColumn('promo', 'annee_scolaire');
        });
    }

    public function down(): void
    {
        Schema::table('etudiants_autorises', function (Blueprint $table) {
            $table->renameColumn('annee_scolaire', 'promo');
        });
    }
};