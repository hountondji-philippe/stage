<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SousFiliere extends Model
{
    protected $fillable = ['nom', 'filiere_id'];

    public function filiere(): BelongsTo
    {
        return $this->belongsTo(Filiere::class);
    }

    public function memoires(): HasMany
    {
        return $this->hasMany(Memoire::class);
    }
}