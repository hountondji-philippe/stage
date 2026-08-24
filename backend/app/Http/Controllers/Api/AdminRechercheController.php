<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Memoire;
use App\Models\EtudiantAutorise;
use App\Models\Filiere;
use Illuminate\Http\Request;

class AdminRechercheController extends Controller
{
    public function index(Request $request)
    {
        $terme = trim($request->input('q', ''));

        if (mb_strlen($terme) < 2) {
            return response()->json(['memoires' => [], 'etudiants' => [], 'filieres' => []]);
        }

        $mots = array_filter(explode(' ', $terme));

        // Mémoires : cherche dans le titre OU le nom de la filière liée
        $memoires = Memoire::where(function ($q) use ($mots) {
                foreach ($mots as $mot) {
                    $q->where(function ($sub) use ($mot) {
                        $sub->where('titre', 'like', "%{$mot}%")
                            ->orWhereHas('filiere', function ($f) use ($mot) {
                                $f->where('nom', 'like', "%{$mot}%");
                            });
                    });
                }
            })
            ->with('filiere:id,nom')
            ->latest()
            ->limit(5)
            ->get(['id', 'titre', 'statut', 'filiere_id']);

        // Étudiants : nom, prénom, matricule, email
        $etudiants = EtudiantAutorise::where(function ($q) use ($mots) {
                foreach ($mots as $mot) {
                    $q->where(function ($sub) use ($mot) {
                        $sub->where('nom', 'like', "%{$mot}%")
                            ->orWhere('prenom', 'like', "%{$mot}%")
                            ->orWhere('matricule', 'like', "%{$mot}%")
                            ->orWhere('email', 'like', "%{$mot}%");
                    });
                }
            })
            ->limit(5)
            ->get(['id', 'nom', 'prenom', 'matricule', 'compte_active']);

        // Filières : nom
        $filieres = Filiere::where(function ($q) use ($mots) {
                foreach ($mots as $mot) {
                    $q->where('nom', 'like', "%{$mot}%");
                }
            })
            ->withCount('memoires')
            ->limit(5)
            ->get(['id', 'nom']);

        return response()->json([
            'memoires' => $memoires,
            'etudiants' => $etudiants,
            'filieres' => $filieres,
        ]);
    }
}