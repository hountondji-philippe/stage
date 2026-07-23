<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PeriodeDepot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeriodeDepotController extends Controller
{
    public function statut()
    {
        $periode = PeriodeDepot::actuelle();

        return response()->json([
            'ouverte' => PeriodeDepot::estOuverte(),
            'periode' => $periode,
        ]);
    }

    public function lancer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Donnees invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $periode = PeriodeDepot::create([
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'est_ouverte' => true,
            'ouverte_par' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Periode de depot lancee.',
            'periode' => $periode,
        ], 201);
    }

    public function fermer(Request $request)
    {
        $periode = PeriodeDepot::actuelle();

        if (!$periode) {
            return response()->json(['message' => 'Aucune periode active.'], 404);
        }

        $periode->update(['est_ouverte' => false]);

        return response()->json([
            'message' => 'Periode de depot fermee.',
            'periode' => $periode,
        ]);
    }
}