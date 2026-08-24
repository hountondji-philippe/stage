<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->string('niveau')->nullable()->after('cycle');
        });
    }

    public function down(): void
    {
        Schema::table('memoires', function (Blueprint $table) {
            $table->dropColumn('niveau');
        });
    }
};