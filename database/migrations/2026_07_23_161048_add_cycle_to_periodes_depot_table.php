<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('periodes_depot', function (Blueprint $table) {
            $table->enum('cycle', ['licence', 'master', 'tous'])->default('tous')->after('date_fin');
        });
    }

    public function down(): void
    {
        Schema::table('periodes_depot', function (Blueprint $table) {
            $table->dropColumn('cycle');
        });
    }
};