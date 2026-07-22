<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    protected $fillable = [
        'user_id', 'sujet', 'categorie', 'description',
        'statut', 'reponse', 'repondu_par', 'repondu_le',
    ];

    protected function casts(): array
    {
        return [
            'repondu_le' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'repondu_par');
    }

    public function estOuvert(): bool
    {
        return $this->statut === 'ouvert';
    }
}