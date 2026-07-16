<?php

namespace Database\Seeders;

use App\Models\EtudiantAutorise;
use App\Models\Filiere;
use Illuminate\Database\Seeder;

class EtudiantAutoriseSeeder extends Seeder
{
    public function run(): void
    {
        $filiereInfoGestion = Filiere::where('nom', 'Informatique de Gestion')->first();

        $etudiantsTest = [
            [
                'matricule' => 'IFRI2024001',
                'email' => 'hountondjiphilippe58@gmail.com',
                'nom' => 'Hountondji',
                'prenom' => 'Philippe',
                'annee_scolaire' => '2024-2025',
                'niveau' => 'L3',
            ],
            [
                'matricule' => 'IFRI2024002',
                'email' => 'etudiant2.test@ifri-uac.bj',
                'nom' => 'Dossou',
                'prenom' => 'Marie',
                'annee_scolaire' => '2024-2025',
                'niveau' => 'L3',
            ],
            [
                'matricule' => 'IFRI2023015',
                'email' => 'etudiant3.test@ifri-uac.bj',
                'nom' => 'Agossou',
                'prenom' => 'Jean',
                'annee_scolaire' => '2023-2024',
                'niveau' => 'L2',
            ],
        ];

        foreach ($etudiantsTest as $etudiant) {
            EtudiantAutorise::firstOrCreate(
                ['matricule' => $etudiant['matricule']],
                [
                    'email' => $etudiant['email'],
                    'nom' => $etudiant['nom'],
                    'prenom' => $etudiant['prenom'],
                    'filiere_id' => $filiereInfoGestion->id,
                    'annee_scolaire' => $etudiant['annee_scolaire'],
                    'niveau' => $etudiant['niveau'],
                    'compte_active' => false,
                ]
            );
        }
    }
}