<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FiliereController extends Controller
{
    public function index()
    {
        $filieres = Filiere::orderBy('nom')->get();

        return response()->json(['filieres' => $filieres]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255|unique:filieres,nom',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $filiere = Filiere::create($validator->validated());

        return response()->json([
            'message' => 'Filière créée.',
            'filiere' => $filiere,
        ], 201);
    }

    public function show(Filiere $filiere)
    {
        return response()->json(['filiere' => $filiere]);
    }

    public function update(Request $request, Filiere $filiere)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|string|max:255|unique:filieres,nom,' . $filiere->id,
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $filiere->update($validator->validated());

        return response()->json([
            'message' => 'Filière mise à jour.',
            'filiere' => $filiere,
        ]);
    }

    public function destroy(Filiere $filiere)
    {
        if ($filiere->etudiantsAutorises()->exists() || $filiere->memoires()->exists()) {
            return response()->json([
                'message' => 'Impossible de supprimer une filière utilisée par des étudiants ou des mémoires.',
            ], 409);
        }

        $filiere->delete();

        return response()->json([
            'message' => 'Filière supprimée.',
        ]);
    }
}