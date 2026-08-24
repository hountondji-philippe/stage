<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE memoires MODIFY COLUMN statut ENUM('en_attente', 'en_attente_binome', 'valide', 'rejete') NOT NULL DEFAULT 'en_attente'");
        } else {
            DB::statement("ALTER TABLE memoires DROP CONSTRAINT IF EXISTS memoires_statut_check");
            DB::statement("ALTER TABLE memoires ADD CONSTRAINT memoires_statut_check CHECK (statut IN ('en_attente', 'en_attente_binome', 'valide', 'rejete'))");
        }
    }

    public function down(): void
    {
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE memoires MODIFY COLUMN statut ENUM('en_attente', 'valide', 'rejete') NOT NULL DEFAULT 'en_attente'");
        } else {
            DB::statement("ALTER TABLE memoires DROP CONSTRAINT IF EXISTS memoires_statut_check");
            DB::statement("ALTER TABLE memoires ADD CONSTRAINT memoires_statut_check CHECK (statut IN ('en_attente', 'valide', 'rejete'))");
        }
    }
};