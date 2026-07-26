<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
  {
      Schema::table('etudiants_autorises', function (Blueprint $table) {
          $table->boolean('annee_validee')->default(false);
          $table->timestamp('annee_validee_le')->nullable();
      });
  }

  public function down()
  {
      Schema::table('etudiants_autorises', function (Blueprint $table) {
          $table->dropColumn(['annee_validee', 'annee_validee_le']);
      });
  }
};
