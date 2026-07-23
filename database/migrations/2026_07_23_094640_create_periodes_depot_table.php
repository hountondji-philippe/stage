<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('periodes_depot', function (Blueprint $table) {
            $table->id();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->boolean('est_ouverte')->default(true);
            $table->foreignId('ouverte_par')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('periodes_depot');
    }
};