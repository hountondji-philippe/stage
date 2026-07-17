<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->string('apercu')->nullable()->after('fichier_memoire');
            $table->enum('cycle', ['licence', 'master'])->nullable()->after('annee');
        });
    }

    public function down(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->dropColumn(['apercu', 'cycle']);
        });
    }
};