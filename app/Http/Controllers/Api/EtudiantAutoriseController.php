<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EtudiantAutorise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtudiantAutoriseController extends Controller
{
    public function index(Request $request)
    {
        $query = EtudiantAutorise::with('filiere');

        if ($request->filled('filiere_id')) {
            $query->where('filiere_id', $request->filiere_id);
        }

        if ($request->filled('promo')) {
            $query->where('promo', $request->promo);
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
            'promo' => 'required|string|max:9',
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

    public function show(EtudiantAutorise $etudiantAutorise)
    {
        return response()->json([
            'etudiant' => $etudiantAutorise->load('filiere', 'user'),
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
            'promo' => 'sometimes|string|max:9',
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
}