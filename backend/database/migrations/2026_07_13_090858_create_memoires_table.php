<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memoires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('titre');
            $table->text('resume');
            $table->foreignId('filiere_id')->constrained('filieres');
            $table->string('annee');
            $table->string('encadrant');
            $table->string('fichier_memoire');
            $table->string('fichier_preuve');
            $table->enum('statut', ['en_attente', 'valide', 'rejete'])->default('en_attente');
            $table->text('motif_rejet')->nullable();
            $table->foreignId('valide_par')->nullable()->constrained('users');
            $table->timestamp('valide_le')->nullable();
            $table->unsignedInteger('views_count')->default(0);
            $table->timestamps();

            $table->index(['statut', 'filiere_id', 'annee']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memoires');
    }
};