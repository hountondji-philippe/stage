<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('etudiants_autorises', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->string('email')->unique();
            $table->string('nom');
            $table->string('prenom');
            $table->foreignId('filiere_id')->constrained('filieres');
            $table->string('promo');
            $table->boolean('compte_active')->default(false);
            $table->string('token_activation')->nullable();
            $table->timestamp('token_expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etudiants_autorises');
    }
};