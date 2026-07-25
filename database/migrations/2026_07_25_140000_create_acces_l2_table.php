<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('acces_l2', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_autorise_id')->constrained('etudiants_autorises')->cascadeOnDelete();
            $table->string('code')->nullable();
            $table->timestamp('code_expire_le')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('acces_l2');
    }
};