<?php

namespace Database\Seeders;

use App\Models\EtudiantAutorise;
use App\Models\Filiere;
use App\Models\SousFiliere;
use Illuminate\Database\Seeder;

class DemoEtudiantsSeeder extends Seeder
{
    /**
     * Crée les 12 filières réelles de l'ENEAM (si elles n'existent pas déjà),
     * quelques sous-filières pour les 2 filières qui en ont pour l'instant,
     * puis 50 étudiants de test répartis sur ces filières et les 5 niveaux.
     *
     * 6 comptes utilisent de vraies adresses gmail pour pouvoir tester
     * concrètement la réception des emails (activation, code d'accès L2,
     * confirmation de binôme) :
     *   - L1 : jesussede43@gmail.com
     *   - L2 : educbenin01@gmail.com
     *   - L3 : hountondjiphilippe58@gmail.com + hountondjiphilippe84@gmail.com (binôme)
     *   - M1 : phountondji90@gmail.com
     *   - M2 : kikisagbe868@gmail.com
     *
     * Tous les étudiants démarrent avec annee_validee = false : c'est le
     * fichier Excel téléversé ensuite par l'admin qui fera passer certains
     * d'entre eux à true (le binôme L3 + l'étudiant L2), exactement comme
     * le ferait un vrai import admin.
     */
    public function run(): void
    {
        $nomsFilieres = [
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

        $filieres = collect($nomsFilieres)->mapWithKeys(function ($nom) {
            $filiere = Filiere::firstOrCreate(
                ['nom' => $nom],
                ['description' => 'Filière ' . $nom]
            );
            return [$nom => $filiere];
        });

        $sousFilieresParFiliere = [
            'Informatique de Gestion' => [
                'Administration des réseaux informatiques',
                'Analyse informatique et programmation',
            ],
            'Statistique' => [
                'Statistiques économique',
                'Statistiques Démographique',
            ],
        ];

        $sousFilieres = collect();

        foreach ($sousFilieresParFiliere as $nomFiliere => $listeSousFilieres) {
            foreach ($listeSousFilieres as $nomSousFiliere) {
                $sousFilieres->push(
                    SousFiliere::firstOrCreate([
                        'nom' => $nomSousFiliere,
                        'filiere_id' => $filieres[$nomFiliere]->id,
                    ])
                );
            }
        }

        $prenoms = ['Kofi', 'Amina', 'Rachidi', 'Fatou', 'Sedjro', 'Aicha', 'Fabrice', 'Nadège', 'Yacouba', 'Chimène',
                    'Bertin', 'Mariam', 'Cyrille', 'Rosine', 'Ibrahim', 'Solange', 'Franck', 'Zeinab', 'Aristide', 'Doris'];
        $noms = ['Adjovi', 'Toure', 'Zinsou', 'Kone', 'Houngbo', 'Djibril', 'Assogba', 'Sanni', 'Ahoyo', 'Bello',
                 'Dossou', 'Traore', 'Gbaguidi', 'Coulibaly', 'Tossou', 'Ouedraogo', 'Agossou', 'Sawadogo', 'Loko', 'Kaboré'];

        // Répartition des 50 étudiants sur les niveaux
        $repartition = [
            'L1' => 10,
            'L2' => 10,
            'L3' => 12,
            'M1' => 9,
            'M2' => 9,
        ];

        // Emails réels fournis, assignés à des matricules précis pour pouvoir
        // vérifier concrètement la réception des emails dans de vraies boîtes
        // de réception pendant les tests.
        $emailsReels = [
            '10081600' => 'jesussede43@gmail.com',              // L1  -> test activation
            '10081610' => 'educbenin01@gmail.com',              // L2  -> test code d'accès + validation
            '10081620' => 'hountondjiphilippe58@gmail.com',     // L3  -> déposant, test activation + dépôt binôme + validation
            '10081621' => 'hountondjiphilippe84@gmail.com',     // L3  -> binôme du précédent, test confirmation + validation
            '10081632' => 'phountondji90@gmail.com',            // M1  -> test activation
            '10081641' => 'kikisagbe868@gmail.com',             // M2  -> test activation
        ];

        // Filière forcée pour les comptes réels du binôme L3 (les deux doivent
        // être dans la même filière pour pouvoir déposer ensemble)
        $filiereForcee = [
            '10081620' => 'Informatique de Gestion',
            '10081621' => 'Informatique de Gestion',
        ];

        $matriculeDepart = 10081600;
        $nomsFilieresListe = $filieres->keys()->all();

        foreach ($repartition as $niveau => $nombre) {
            for ($i = 0; $i < $nombre; $i++) {
                $prenom = $prenoms[array_rand($prenoms)];
                $nom = $noms[array_rand($noms)];
                $matricule = (string) $matriculeDepart;

                $nomFiliere = $filiereForcee[$matricule]
                    ?? $nomsFilieresListe[array_rand($nomsFilieresListe)];

                EtudiantAutorise::firstOrCreate(
                    ['matricule' => $matricule],
                    [
                        'email' => $emailsReels[$matricule] ?? ('etudiant' . $matricule . '@test-eneam.com'),
                        'nom' => $nom,
                        'prenom' => $prenom,
                        'filiere_id' => $filieres[$nomFiliere]->id,
                        'niveau' => $niveau,
                        'annee_scolaire' => '2025-2026',
                        'compte_active' => false,
                        'annee_validee' => false,
                    ]
                );

                $matriculeDepart++;
            }
        }

        $this->command->info('12 filières, ' . $sousFilieres->count() . ' sous-filières et 50 étudiants de test créés (matricules 10081600 à ' . ($matriculeDepart - 1) . ').');
    }
}