<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Memoire extends Model
{
    protected $fillable = [
        'user_id',
        'titre',
        'resume',
        'filiere_id',
        'sous_filiere_id',
        'annee',
        'cycle',
        'encadrant',
        'fichier_memoire',
        'apercu',
        'fichier_preuve',
        'statut',
        'motif_rejet',
        'valide_par',
        'valide_le',
    ];

    protected function casts(): array
    {
        return [
            'valide_le' => 'datetime',
            'views_count' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function filiere(): BelongsTo
    {
        return $this->belongsTo(Filiere::class);
    }

    public function validateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'valide_par');
    }

    public function estValide(): bool
    {
        return $this->statut === 'valide';
    }
     
        public function sousFiliere(): BelongsTo
    {
        return $this->belongsTo(SousFiliere::class);
    }
    
    public function estEnAttente(): bool
    {
        return $this->statut === 'en_attente';
    }

    public function scopeValides($query)
    {
        return $query->where('statut', 'valide');
    }

    public function scopeEnAttente($query)
    {
        return $query->where('statut', 'en_attente');
    }
}