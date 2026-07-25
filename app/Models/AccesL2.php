<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\HasApiTokens;

class AccesL2 extends Model
{
    use HasApiTokens;

    protected $table = 'acces_l2';

    protected $fillable = [
        'etudiant_autorise_id',
        'code',
        'code_expire_le',
    ];

    protected function casts(): array
    {
        return [
            'code_expire_le' => 'datetime',
        ];
    }

    public function etudiantAutorise(): BelongsTo
    {
        return $this->belongsTo(EtudiantAutorise::class);
    }
}