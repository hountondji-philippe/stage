<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Actualite extends Model
{
    protected $fillable = ['titre', 'contenu', 'icone', 'date_publication'];

    protected function casts(): array
    {
        return [
            'date_publication' => 'date',
        ];
    }
}