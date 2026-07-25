<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->boolean('binome_confirme')->default(true)->after('prenom_binome');
            $table->string('binome_token', 64)->nullable()->unique()->after('binome_confirme');
            $table->timestamp('binome_confirme_le')->nullable()->after('binome_token');
        });
    }

    public function down(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->dropColumn(['binome_confirme', 'binome_token', 'binome_confirme_le']);
        });
    }
};