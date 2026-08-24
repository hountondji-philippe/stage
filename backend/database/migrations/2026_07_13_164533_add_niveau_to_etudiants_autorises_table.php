<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('etudiants_autorises', function (Blueprint $table) {
            $table->enum('niveau', ['L1', 'L2', 'L3', 'M1', 'M2'])
                  ->after('promo');
        });
    }

    public function down(): void
    {
        Schema::table('etudiants_autorises', function (Blueprint $table) {
            $table->dropColumn('niveau');
        });
    }
};