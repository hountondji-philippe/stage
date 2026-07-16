<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->foreignId('sous_filiere_id')->nullable()->after('filiere_id')->constrained('sous_filieres')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->dropForeign(['sous_filiere_id']);
            $table->dropColumn('sous_filiere_id');
        });
    }
};