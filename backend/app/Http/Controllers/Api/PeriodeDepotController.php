<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PeriodeDepot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeriodeDepotController extends Controller
{
    public function statut(Request $request)
    {
        return response()->json([
            'licence_ouverte' => PeriodeDepot::estOuvertePour('licence'),
            'master_ouverte' => PeriodeDepot::estOuvertePour('master'),
        ]);
    }

    public function index()
    {
        return response()->json(['periodes' => PeriodeDepot::toutes()]);
    }

    public function lancer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'cycle' => 'required|in:licence,master,tous',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $periode = PeriodeDepot::create([
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'cycle' => $request->cycle,
            'est_ouverte' => true,
            'ouverte_par' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Période de dépôt lancée.',
            'periode' => $periode,
        ], 201);
    }

    public function fermer(PeriodeDepot $periodeDepot)
    {
        $periodeDepot->update(['est_ouverte' => false]);

        return response()->json([
            'message' => 'Période de dépôt fermée.',
            'periode' => $periodeDepot,
        ]);
    }
}