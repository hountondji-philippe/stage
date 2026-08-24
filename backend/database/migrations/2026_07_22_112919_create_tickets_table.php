<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('sujet');
            $table->enum('categorie', ['depot', 'compte', 'bug', 'administratif', 'autre']);
            $table->text('description');
            $table->enum('statut', ['ouvert', 'resolu'])->default('ouvert');
            $table->text('reponse')->nullable();
            $table->foreignId('repondu_par')->nullable()->constrained('users');
            $table->timestamp('repondu_le')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};