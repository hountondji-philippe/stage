<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeriodeDepot extends Model
{
    protected $table = 'periodes_depot';

    protected $fillable = ['date_debut', 'date_fin', 'est_ouverte', 'ouverte_par'];

    protected function casts(): array
    {
        return [
            'date_debut' => 'date',
            'date_fin' => 'date',
            'est_ouverte' => 'boolean',
        ];
    }

    public static function actuelle(): ?self
    {
        return static::latest('id')->first();
    }

    public static function estOuverte(): bool
    {
        $periode = static::actuelle();

        if (!$periode || !$periode->est_ouverte) {
            return false;
        }

        $aujourdhui = now()->startOfDay();

        return $aujourdhui->gte($periode->date_debut) && $aujourdhui->lte($periode->date_fin);
    }
}