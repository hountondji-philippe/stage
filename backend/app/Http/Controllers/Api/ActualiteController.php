<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Actualite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActualiteController extends Controller
{
    public function index()
    {
        $actualites = Actualite::orderByDesc('date_publication')->get();

        return response()->json(['actualites' => $actualites]);
    }
    public function show(Actualite $actualite)
{
    return response()->json([
        'actualite' => $actualite,
    ]);
}

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
            'icone' => 'nullable|string|max:50',
            'date_publication' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $actualite = Actualite::create($validator->validated());

        return response()->json([
            'message' => 'Actualité créée.',
            'actualite' => $actualite,
        ], 201);
    }

    public function update(Request $request, Actualite $actualite)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|string|max:255',
            'contenu' => 'sometimes|string',
            'icone' => 'nullable|string|max:50',
            'date_publication' => 'sometimes|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $actualite->update($validator->validated());

        return response()->json([
            'message' => 'Actualité mise à jour.',
            'actualite' => $actualite,
        ]);
    }

    public function destroy(Actualite $actualite)
    {
        $actualite->delete();

        return response()->json([
            'message' => 'Actualité supprimée.',
        ]);
    }
}