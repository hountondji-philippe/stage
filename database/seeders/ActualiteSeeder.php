<?php

namespace Database\Seeders;

use App\Models\Actualite;
use Illuminate\Database\Seeder;

class ActualiteSeeder extends Seeder
{
    public function run(): void
    {
        Actualite::create([
            'titre' => 'Cérémonie de remise des prix du meilleur mémoire 2025',
            'contenu' => 'Retour sur la cérémonie annuelle récompensant les travaux de recherche les plus remarqués de l\'année écoulée.',
            'icone' => 'trophy',
            'date_publication' => '2026-02-08',
        ]);

        Actualite::create([
            'titre' => 'Nouveau partenariat avec les bibliothèques numériques régionales',
            'contenu' => 'L\'ENEAM élargit l\'accès à ses ressources académiques grâce à un accord avec le réseau documentaire de l\'UEMOA.',
            'icone' => 'graduation-cap',
            'date_publication' => '2026-02-15',
        ]);

        Actualite::create([
            'titre' => 'Ouverture de la période de dépôt pour la session 2026',
            'contenu' => 'Les étudiants finissants peuvent désormais soumettre leur mémoire pour validation avant la date limite du 30 juin.',
            'icone' => 'megaphone',
            'date_publication' => '2026-03-12',
        ]);
    }
}