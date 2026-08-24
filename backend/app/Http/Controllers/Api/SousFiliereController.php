<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SousFiliere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SousFiliereController extends Controller
{
    public function index(Request $request)
    {
        $query = SousFiliere::query();

        if ($request->filled('filiere_id')) {
            $query->where('filiere_id', $request->filiere_id);
        }

        $sousFilieres = $query->orderBy('nom')->get();

        return response()->json(['sous_filieres' => $sousFilieres]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'filiere_id' => 'required|exists:filieres,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Donnees invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $sousFiliere = SousFiliere::create($validator->validated());

        return response()->json([
            'message' => 'Sous-filiere creee.',
            'sous_filiere' => $sousFiliere,
        ], 201);
    }

    public function update(Request $request, SousFiliere $sousFiliere)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|string|max:255',
            'filiere_id' => 'sometimes|exists:filieres,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Donnees invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $sousFiliere->update($validator->validated());

        return response()->json([
            'message' => 'Sous-filiere mise a jour.',
            'sous_filiere' => $sousFiliere,
        ]);
    }

    public function destroy(SousFiliere $sousFiliere)
    {
        if ($sousFiliere->memoires()->exists()) {
            return response()->json([
                'message' => 'Impossible de supprimer une sous-filiere utilisee par des memoires.',
            ], 409);
        }

        $sousFiliere->delete();

        return response()->json([
            'message' => 'Sous-filiere supprimee.',
        ]);
    }
}