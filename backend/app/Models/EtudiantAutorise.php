<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EtudiantAutorise extends Model
{
    protected $table = 'etudiants_autorises';

    protected $fillable = [
        'matricule',
        'email',
        'nom',
        'prenom',
        'filiere_id',
        'annee_scolaire',
        'niveau',
        'compte_active',
        'token_activation',
        'token_expires_at',
        'annee_validee',
        'annee_validee_le',
    ];

    protected $hidden = [
        'token_activation',
    ];

    protected function casts(): array
    {
        return [
            'compte_active' => 'boolean',
            'annee_validee' => 'boolean',
            'token_expires_at' => 'datetime',
            'annee_validee_le' => 'datetime',
        ];
    }

    public function filiere(): BelongsTo
    {
        return $this->belongsTo(Filiere::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}