<?php

namespace App\Imports;

use App\Models\EtudiantAutorise;
use App\Models\Filiere;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class EtudiantsAutorisesImport implements ToCollection, WithHeadingRow
{
    public array $crees = [];
    public array $ignores = [];
    public array $erreurs = [];

    public function collection($rows)
    {
        foreach ($rows as $index => $row) {
            $ligne = $index + 2;

            $matricule = trim($row['matricule'] ?? '');
            $email = trim($row['email'] ?? '');
            $nom = trim($row['nom'] ?? '');
            $prenom = trim($row['prenom'] ?? '');
            $nomFiliere = trim($row['filiere'] ?? '');
            $niveau = strtoupper(trim($row['niveau'] ?? ''));
            $anneeScolaire = trim($row['annee_scolaire'] ?? '');

            if (!$matricule || !$email || !$nom || !$prenom || !$nomFiliere || !$niveau || !$anneeScolaire) {
                $this->erreurs[] = "Ligne {$ligne} : une ou plusieurs colonnes sont vides.";
                continue;
            }

            if (!in_array($niveau, ['L1', 'L2', 'L3', 'M1', 'M2'])) {
                $this->erreurs[] = "Ligne {$ligne} : niveau '{$niveau}' invalide (attendu L1, L2, L3, M1 ou M2).";
                continue;
            }

            $filiere = Filiere::where('nom', $nomFiliere)->first();

            if (!$filiere) {
                $this->erreurs[] = "Ligne {$ligne} : filiere '{$nomFiliere}' introuvable.";
                continue;
            }

            $existeDeja = EtudiantAutorise::where('matricule', $matricule)
                ->orWhere('email', $email)
                ->exists();

            if ($existeDeja) {
                $this->ignores[] = "Ligne {$ligne} : matricule ou email deja present ({$matricule}).";
                continue;
            }

            EtudiantAutorise::create([
                'matricule' => $matricule,
                'email' => $email,
                'nom' => $nom,
                'prenom' => $prenom,
                'filiere_id' => $filiere->id,
                'niveau' => $niveau,
                'annee_scolaire' => $anneeScolaire,
                'compte_active' => false,
            ]);

            $this->crees[] = $matricule;
        }
    }
}