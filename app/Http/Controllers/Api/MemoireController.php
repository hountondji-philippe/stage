<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Memoire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class MemoireController extends Controller
{
    public function rechercherPublic(Request $request)
    {
        $query = Memoire::valides()->with(['filiere', 'user']);

        if ($request->filled('filiere_id')) {
            $query->where('filiere_id', $request->filiere_id);
        }

        if ($request->filled('annee')) {
            $query->where('annee', $request->annee);
        }

        if ($request->filled('recherche')) {
            $terme = $request->recherche;
            $query->where(function ($q) use ($terme) {
                $q->where('titre', 'like', "%{$terme}%")
                  ->orWhere('resume', 'like', "%{$terme}%");
            });
        }

        $memoires = $query->latest('valide_le')->paginate(12);

        return response()->json($memoires);
    }

    public function afficherPublic(Memoire $memoire)
    {
        if (!$memoire->estValide()) {
            return response()->json([
                'message' => 'Ce mémoire n\'est pas disponible.',
            ], 404);
        }

        $memoire->increment('views_count');

        return response()->json([
            'memoire' => $memoire->load(['filiere', 'user.etudiantAutorise']),
        ]);
    }

    public function fichierPublic(Memoire $memoire)
    {
        if (!$memoire->estValide()) {
            abort(404);
        }

        return Storage::disk('local')->response($memoire->fichier_memoire);
    }

    public function telechargerPublic(Memoire $memoire)
    {
        if (!$memoire->estValide()) {
            abort(404);
        }

        return Storage::disk('local')->download(
            $memoire->fichier_memoire,
            Str::slug($memoire->titre) . '.pdf'
        );
    }

    public function mesMemoires(Request $request)
    {
        $memoires = $request->user()->memoires()->with('filiere')->latest()->get();

        return response()->json(['memoires' => $memoires]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'resume' => 'required|string',
            'filiere_id' => 'required|exists:filieres,id',
            'annee' => 'required|string|max:4',
            'encadrant' => 'required|string|max:255',
            'fichier_memoire' => 'required|file|mimes:pdf|max:10240',
            'fichier_preuve' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $cheminMemoire = $request->file('fichier_memoire')->store('memoires', 'local');
        $cheminPreuve = $request->file('fichier_preuve')->store('preuves', 'local');

        $memoire = Memoire::create([
            'user_id' => $request->user()->id,
            'titre' => $request->titre,
            'resume' => $request->resume,
            'filiere_id' => $request->filiere_id,
            'annee' => $request->annee,
            'encadrant' => $request->encadrant,
            'fichier_memoire' => $cheminMemoire,
            'fichier_preuve' => $cheminPreuve,
            'statut' => 'en_attente',
        ]);

        return response()->json([
            'message' => 'Mémoire déposé avec succès. Il sera examiné par l\'administration.',
            'memoire' => $memoire,
        ], 201);
    }

    public function update(Request $request, Memoire $memoire)
    {
        if ($memoire->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Action non autorisée.'], 403);
        }

        if (!$memoire->estEnAttente()) {
            return response()->json([
                'message' => 'Seul un mémoire en attente peut être modifié.',
            ], 409);
        }

        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|string|max:255',
            'resume' => 'sometimes|string',
            'filiere_id' => 'sometimes|exists:filieres,id',
            'annee' => 'sometimes|string|max:4',
            'encadrant' => 'sometimes|string|max:255',
            'fichier_memoire' => 'sometimes|file|mimes:pdf|max:10240',
            'fichier_preuve' => 'sometimes|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $donnees = $request->only(['titre', 'resume', 'filiere_id', 'annee', 'encadrant']);

        if ($request->hasFile('fichier_memoire')) {
            Storage::disk('local')->delete($memoire->fichier_memoire);
            $donnees['fichier_memoire'] = $request->file('fichier_memoire')->store('memoires', 'local');
        }

        if ($request->hasFile('fichier_preuve')) {
            Storage::disk('local')->delete($memoire->fichier_preuve);
            $donnees['fichier_preuve'] = $request->file('fichier_preuve')->store('preuves', 'local');
        }

        $memoire->update($donnees);

        return response()->json([
            'message' => 'Mémoire mis à jour avec succès.',
            'memoire' => $memoire,
        ]);
    }
      

        public function destroy(Request $request, Memoire $memoire)
    {
        if ($memoire->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Action non autorisée.'], 403);
        }

        if (!$memoire->estEnAttente()) {
            return response()->json([
                'message' => 'Seul un mémoire en attente peut être supprimé.',
            ], 409);
        }

        Storage::disk('local')->delete([$memoire->fichier_memoire, $memoire->fichier_preuve]);
        $memoire->delete();

        return response()->json([
            'message' => 'Mémoire supprimé avec succès.',
        ]);
    }

    public function enAttenteAdmin()
    {
        $memoires = Memoire::enAttente()->with(['filiere', 'user.etudiantAutorise'])->latest()->get();

        return response()->json(['memoires' => $memoires]);
    }

    public function fichierAdmin(Memoire $memoire, string $type)
    {
        if (!in_array($type, ['memoire', 'preuve'])) {
            abort(404);
        }

        $chemin = $type === 'memoire' ? $memoire->fichier_memoire : $memoire->fichier_preuve;

        return Storage::disk('local')->response($chemin);
    }

    public function valider(Request $request, Memoire $memoire)
    {
        if (!$memoire->estEnAttente()) {
            return response()->json([
                'message' => 'Ce mémoire a déjà été traité.',
            ], 409);
        }

        $memoire->update([
            'statut' => 'valide',
            'valide_par' => $request->user()->id,
            'valide_le' => now(),
        ]);

        return response()->json([
            'message' => 'Mémoire validé et publié.',
            'memoire' => $memoire,
        ]);
    }

    public function rejeter(Request $request, Memoire $memoire)
    {
        $validator = Validator::make($request->all(), [
            'motif_rejet' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Le motif de rejet est obligatoire.',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!$memoire->estEnAttente()) {
            return response()->json([
                'message' => 'Ce mémoire a déjà été traité.',
            ], 409);
        }

        $memoire->update([
            'statut' => 'rejete',
            'motif_rejet' => $request->motif_rejet,
            'valide_par' => $request->user()->id,
            'valide_le' => now(),
        ]);

        return response()->json([
            'message' => 'Mémoire rejeté.',
            'memoire' => $memoire,
        ]);
    }

    public function stats()
{
    $total = Memoire::count();
    $enAttente = Memoire::where('statut', 'en_attente')->count();
    $valide = Memoire::where('statut', 'valide')->count();
    $rejete = Memoire::where('statut', 'rejete')->count();

    $parFiliere = Memoire::selectRaw('filiere_id, count(*) as total')
        ->groupBy('filiere_id')
        ->with('filiere:id,nom')
        ->orderByDesc('total')
        ->limit(6)
        ->get()
        ->map(fn ($item) => [
            'nom' => $item->filiere->nom ?? 'Non définie',
            'total' => $item->total,
        ]);

    return response()->json([
        'total' => $total,
        'en_attente' => $enAttente,
        'valide' => $valide,
        'rejete' => $rejete,
        'par_filiere' => $parFiliere,
    ]);
}

public function tousAdmin(Request $request)
{
    $query = Memoire::with(['filiere', 'user.etudiantAutorise']);

    if ($request->filled('statut')) {
        $query->where('statut', $request->statut);
    }

    $memoires = $query->latest()->paginate(15);

    return response()->json($memoires);
}

public function supprimerAdmin(Memoire $memoire)
{
    Storage::disk('local')->delete([$memoire->fichier_memoire, $memoire->fichier_preuve]);
    $memoire->delete();

    return response()->json([
        'message' => 'Mémoire supprimé définitivement.',
    ]);
}
}