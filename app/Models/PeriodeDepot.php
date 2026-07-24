<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeriodeDepot extends Model
{
    protected $table = 'periodes_depot';

    protected $fillable = ['date_debut', 'date_fin', 'cycle', 'est_ouverte', 'ouverte_par'];

    protected function casts(): array
    {
        return [
            'date_debut' => 'date',
            'date_fin' => 'date',
            'est_ouverte' => 'boolean',
        ];
    }

    public static function toutes()
    {
        return static::latest('id')->get();
    }

    public static function estOuvertePour(string $cycle): bool
    {
        $aujourdhui = now()->startOfDay();

        return static::where('est_ouverte', true)
            ->where(function ($q) use ($cycle) {
                $q->where('cycle', $cycle)->orWhere('cycle', 'tous');
            })
            ->whereDate('date_debut', '<=', $aujourdhui)
            ->whereDate('date_fin', '>=', $aujourdhui)
            ->exists();
    }
}