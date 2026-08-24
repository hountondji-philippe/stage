<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Memoire;
use App\Models\Filiere;
use App\Models\SousFiliere;
use Illuminate\Http\Request;

class RechercheController extends Controller
{
    public function index(Request $request)
    {
        $terme = trim($request->input('q', ''));

        if (mb_strlen($terme) < 2) {
            return response()->json(['memoires' => [], 'filieres' => [], 'sous_filieres' => []]);
        }

        $mots = array_filter(explode(' ', $terme));

        // Mémoires : uniquement ceux validés/publics, recherche titre, résumé, filière, encadrant
        $memoires = Memoire::valides()
            ->where(function ($q) use ($mots) {
                foreach ($mots as $mot) {
                    $q->where(function ($sub) use ($mot) {
                        $sub->where('titre', 'like', "%{$mot}%")
                            ->orWhere('resume', 'like', "%{$mot}%")
                            ->orWhere('encadrant', 'like', "%{$mot}%")
                            ->orWhereHas('filiere', function ($f) use ($mot) {
                                $f->where('nom', 'like', "%{$mot}%");
                            })
                            ->orWhereHas('sousFiliere', function ($sf) use ($mot) {
                                $sf->where('nom', 'like', "%{$mot}%");
                            });
                    });
                }
            })
            ->with('filiere:id,nom', 'sousFiliere:id,nom')
            ->latest('valide_le')
            ->limit(6)
            ->get(['id', 'titre', 'annee', 'cycle', 'filiere_id', 'sous_filiere_id']);

        // Filières
        $filieres = Filiere::where(function ($q) use ($mots) {
                foreach ($mots as $mot) {
                    $q->where('nom', 'like', "%{$mot}%");
                }
            })
            ->limit(5)
            ->get(['id', 'nom']);

        // Sous-filières
        $sousFilieres = SousFiliere::where(function ($q) use ($mots) {
                foreach ($mots as $mot) {
                    $q->where('nom', 'like', "%{$mot}%");
                }
            })
            ->with('filiere:id,nom')
            ->limit(5)
            ->get(['id', 'nom', 'filiere_id']);

        return response()->json([
            'memoires' => $memoires,
            'filieres' => $filieres,
            'sous_filieres' => $sousFilieres,
        ]);
    }
}