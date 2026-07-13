<?php

namespace Database\Seeders;

use App\Models\Filiere;
use Illuminate\Database\Seeder;

class FiliereSeeder extends Seeder
{
    public function run(): void
    {
        $filieres = [
            'Informatique de Gestion',
            'Statistique',
            'Planification',
            'Gestion Financière et Comptable',
            'Gestion Commerciale',
            'Gestion des Banques et Assurances',
            'Banque et Finance de Marché',
            'Ingénieur Statisticien et Économiste',
            'Diplôme d\'Etudes de Comptabilité et de Gestion Financière',
            'Contrôle de Gestion et Audit Financier',
            'Gestion des Transports et Logistiques',
            'Gestion des Ressources Humaines',
        ];

        foreach ($filieres as $nom) {
            Filiere::firstOrCreate(['nom' => $nom]);
        }
    }
}