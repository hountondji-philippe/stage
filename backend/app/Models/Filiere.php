<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Filiere extends Model
{
    protected $fillable = ['nom', 'description'];

    public function etudiantsAutorises(): HasMany
    {
        return $this->hasMany(EtudiantAutorise::class);
    }

    public function memoires(): HasMany
    {
        return $this->hasMany(Memoire::class);
    }

        public function sousFilieres(): HasMany
    {
        return $this->hasMany(SousFiliere::class);
    }
}