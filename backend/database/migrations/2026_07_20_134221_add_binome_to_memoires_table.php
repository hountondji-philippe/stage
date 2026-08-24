<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->enum('mode_depot', ['unique', 'binome'])->default('unique')->after('cycle');
            $table->string('matricule_binome')->nullable()->after('mode_depot');
            $table->string('nom_binome')->nullable()->after('matricule_binome');
            $table->string('prenom_binome')->nullable()->after('nom_binome');

            // fichier_preuve n'est plus une preuve téléversée mais la fiche générée automatiquement
            $table->string('fichier_preuve')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->dropColumn(['mode_depot', 'matricule_binome', 'nom_binome', 'prenom_binome']);
        });
    }
};