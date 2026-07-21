<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EtudiantAutorise;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Imports\EtudiantsAutorisesImport;
use Maatwebsite\Excel\Facades\Excel;

class EtudiantAutoriseController extends Controller
{
    public function index(Request $request)
{
    $query = EtudiantAutorise::with('filiere');

    if ($request->filled('filiere_id')) {
        $query->where('filiere_id', $request->filiere_id);
    }

    if ($request->filled('annee_scolaire')) {
        $query->where('annee_scolaire', $request->annee_scolaire);
    }

    if ($request->filled('compte_active')) {
        $query->where('compte_active', $request->boolean('compte_active'));
    }

    if ($request->filled('recherche')) {
        $terme = $request->recherche;
        $query->where(function ($q) use ($terme) {
            $q->where('matricule', 'like', "%{$terme}%")
              ->orWhere('nom', 'like', "%{$terme}%")
              ->orWhere('prenom', 'like', "%{$terme}%")
              ->orWhere('email', 'like', "%{$terme}%");
        });
    }

    if ($request->filled('exclude_matricule')) {
        $query->where('matricule', '!=', $request->exclude_matricule);
    }

    $etudiants = $query->latest()->paginate(20);

    return response()->json($etudiants);
}
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'matricule' => 'required|string|unique:etudiants_autorises,matricule',
            'email' => 'required|email|unique:etudiants_autorises,email',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'filiere_id' => 'required|exists:filieres,id',
            'annee_scolaire' => 'required|string|max:9',
            'niveau' => 'required|in:L1,L2,L3,M1,M2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $etudiant = EtudiantAutorise::create($validator->validated());

        return response()->json([
            'message' => 'Étudiant ajouté à la liste des autorisés.',
            'etudiant' => $etudiant->load('filiere'),
        ], 201);
    }
//logique pour afficher les détails d'un étudiant autorisé
    public function show(EtudiantAutorise $etudiantAutorise)
{
    $etudiantAutorise->load(['filiere', 'user.memoires.filiere', 'user.memoires.sousFiliere']);

    return response()->json([
        'etudiant' => $etudiantAutorise,
    ]);
}

            public function update(Request $request, EtudiantAutorise $etudiantAutorise)
            {
                $validator = Validator::make($request->all(), [
                    'matricule' => 'sometimes|string|unique:etudiants_autorises,matricule,' . $etudiantAutorise->id,
                    'email' => 'sometimes|email|unique:etudiants_autorises,email,' . $etudiantAutorise->id,
                    'nom' => 'sometimes|string|max:255',
                    'prenom' => 'sometimes|string|max:255',
                    'filiere_id' => 'sometimes|exists:filieres,id',
                    'annee_scolaire' => 'sometimes|string|max:9',
                    'niveau' => 'sometimes|in:L1,L2,L3,M1,M2',
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'message' => 'Données invalides.',
                        'errors' => $validator->errors(),
                    ], 422);
                }

                $etudiantAutorise->update($validator->validated());

                return response()->json([
                    'message' => 'Étudiant mis à jour.',
                    'etudiant' => $etudiantAutorise->load('filiere'),
                ]);
            }
            public function importer(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'fichier' => 'required|file|mimes:xlsx,xls,csv|max:5120',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Fichier invalide. Formats acceptes : xlsx, xls, csv.',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $import = new EtudiantsAutorisesImport();
            Excel::import($import, $request->file('fichier'));

            return response()->json([
                'message' => count($import->crees) . ' etudiant(s) importe(s) avec succes.',
                'crees' => count($import->crees),
                'ignores' => $import->ignores,
                'erreurs' => $import->erreurs,
            ]);
        }
    public function destroy(EtudiantAutorise $etudiantAutorise)
    {
        if ($etudiantAutorise->compte_active) {
            return response()->json([
                'message' => 'Impossible de supprimer un étudiant ayant déjà un compte actif.',
            ], 409);
        }

        $etudiantAutorise->delete();

        return response()->json([
            'message' => 'Étudiant retiré de la liste des autorisés.',
        ]);
    }

    /**
 * Recherche allégée d'étudiants pour la sélection d'un binôme.
 * Accessible à tout utilisateur authentifié (pas réservé aux admins) :
 * ne renvoie que les champs nécessaires à l'affichage d'un résultat de
 * recherche (pas l'email, le statut détaillé du compte, etc.).
 */
public function rechercheBinome(Request $request)
{
    $query = EtudiantAutorise::with('filiere')
        ->where('compte_active', true);

    if ($request->filled('filiere_id')) {
        $query->where('filiere_id', $request->filiere_id);
    }

    if ($request->filled('annee_scolaire')) {
        $query->where('annee_scolaire', $request->annee_scolaire);
    }

    if ($request->filled('recherche')) {
        $terme = $request->recherche;
        $query->where(function ($q) use ($terme) {
            $q->where('matricule', 'like', "%{$terme}%")
              ->orWhere('nom', 'like', "%{$terme}%")
              ->orWhere('prenom', 'like', "%{$terme}%");
        });
    }

    if ($request->filled('exclude_matricule')) {
        $query->where('matricule', '!=', $request->exclude_matricule);
    }

    $etudiants = $query->latest()
        ->paginate(20)
        ->through(fn ($e) => [
            'id' => $e->id,
            'matricule' => $e->matricule,
            'nom' => $e->nom,
            'prenom' => $e->prenom,
            'niveau' => $e->niveau,
            'filiere' => $e->filiere ? ['id' => $e->filiere->id, 'nom' => $e->filiere->nom] : null,
        ]);

    return response()->json($etudiants);
}
}