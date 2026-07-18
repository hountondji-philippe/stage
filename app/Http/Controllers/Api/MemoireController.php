<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Memoire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Process;

class MemoireController extends Controller
{
    public function rechercherPublic(Request $request)
    {
        $query = Memoire::valides()->with(['filiere', 'sousFiliere', 'user.etudiantAutorise']);

        if ($request->filled('filiere_id')) {
            $query->where('filiere_id', $request->filiere_id);
        }

        if ($request->filled('sous_filiere_id')) {
            $query->where('sous_filiere_id', $request->sous_filiere_id);
        }

        if ($request->filled('annee')) {
            $query->where('annee', $request->annee);
        }
        if ($request->filled('cycle')) {
            $query->where('cycle', $request->cycle);
        }

        if ($request->filled('recherche')) {
            $terme = $request->recherche;
            $query->where(function ($q) use ($terme) {
                $q->where('titre', 'like', "%{$terme}%")
                  ->orWhere('resume', 'like', "%{$terme}%");
            });
        }

        $tri = $request->input('tri', 'recent');
    match ($tri) {
        'ancien' => $query->oldest('valide_le'),
        'titre' => $query->orderBy('titre'),
        default => $query->latest('valide_le'),
    };

$memoires = $query->paginate(12);

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
            'memoire' => $memoire->load(['filiere', 'sousFiliere', 'user.etudiantAutorise']),
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
        $memoires = $request->user()->memoires()->with(['filiere', 'sousFiliere'])->latest()->get();

        return response()->json(['memoires' => $memoires]);
    }

    public function monFichier(Request $request, Memoire $memoire, string $type)
{
    if ($memoire->user_id !== $request->user()->id) {
        return response()->json(['message' => 'Action non autorisée.'], 403);
    }

    if (!in_array($type, ['memoire', 'preuve'])) {
        abort(404);
    }

    $chemin = $type === 'memoire' ? $memoire->fichier_memoire : $memoire->fichier_preuve;

    return Storage::disk('local')->response($chemin);
}

  public function monTelechargement(Request $request, Memoire $memoire, string $type)
{
    if ($memoire->user_id !== $request->user()->id) {
        abort(403);
    }

    $chemin = match ($type) {
        'memoire' => $memoire->fichier_memoire,
        'preuve' => $memoire->fichier_preuve,
        default => abort(404),
    };

    if (!$chemin) {
        abort(404);
    }

    return Storage::disk('local')->download(
        $chemin,
        Str::slug($memoire->titre) . '-' . $type . '.pdf'
    );
}

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'resume' => 'required|string',
            'filiere_id' => 'required|exists:filieres,id',
            'sous_filiere_id' => 'nullable|exists:sous_filieres,id',
            'annee' => 'required|string|max:4',
            'encadrant' => 'required|string|max:255',
            'fichier_memoire' => 'required|file|mimes:pdf|max:10240',
            'fichier_preuve' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'cycle' => 'required|in:licence,master',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $cheminMemoire = $request->file('fichier_memoire')->store('memoires', 'local');
        $cheminApercu = null;
            try {
                $cheminPdf = Storage::disk('local')->path($cheminMemoire);
                $nomApercu = 'apercus/' . Str::random(40) . '.jpg';
                Storage::disk('local')->makeDirectory('apercus');
                $cheminApercuComplet = Storage::disk('local')->path($nomApercu);

                $resultat = Process::run([
                    config('app.ghostscript_path'),
                    '-dNOPAUSE',
                    '-dBATCH',
                    '-sDEVICE=jpeg',
                    '-r100',
                    '-dFirstPage=1',
                    '-dLastPage=1',
                    '-sOutputFile=' . $cheminApercuComplet,
                    $cheminPdf,
                ]);

                if ($resultat->successful() && file_exists($cheminApercuComplet)) {
                    $cheminApercu = $nomApercu;
                }
            } catch (\Exception $e) {
                $cheminApercu = null;
            }
        $cheminPreuve = $request->file('fichier_preuve')->store('preuves', 'local');

        $memoire = Memoire::create([
            'user_id' => $request->user()->id,
            'titre' => $request->titre,
            'resume' => $request->resume,
            'filiere_id' => $request->filiere_id,
            'sous_filiere_id' => $request->sous_filiere_id,
            'annee' => $request->annee,
            'encadrant' => $request->encadrant,
            'fichier_memoire' => $cheminMemoire,
            'fichier_preuve' => $cheminPreuve,
            'statut' => 'en_attente',
            'apercu' => $cheminApercu,
            'cycle' => $request->cycle,
        ]);

        return response()->json([
            'message' => 'Mémoire déposé avec succès. Il sera examiné par l\'administration.',
            'memoire' => $memoire,
        ], 201);
    }


    public function storeAdmin(Request $request)
{
    $validator = Validator::make($request->all(), [
        'titre' => 'required|string|max:255',
        'resume' => 'required|string',
        'filiere_id' => 'required|exists:filieres,id',
        'sous_filiere_id' => 'nullable|exists:sous_filieres,id',
        'annee' => 'required|string|max:4',
        'encadrant' => 'required|string|max:255',
        'fichier_memoire' => 'required|file|mimes:pdf|max:10240',
        'fichier_preuve' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        'cycle' => 'required|in:licence,master',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Données invalides.',
            'errors' => $validator->errors(),
        ], 422);
    }

    $cheminMemoire = $request->file('fichier_memoire')->store('memoires', 'local');
    $cheminApercu = null;
    try {
        $cheminPdf = Storage::disk('local')->path($cheminMemoire);
        $nomApercu = 'apercus/' . Str::random(40) . '.jpg';
        Storage::disk('local')->makeDirectory('apercus');
        $cheminApercuComplet = Storage::disk('local')->path($nomApercu);

        $resultat = Process::run([
            config('app.ghostscript_path'),
            '-dNOPAUSE', '-dBATCH', '-sDEVICE=jpeg', '-r100',
            '-dFirstPage=1', '-dLastPage=1',
            '-sOutputFile=' . $cheminApercuComplet,
            $cheminPdf,
        ]);

        if ($resultat->successful() && file_exists($cheminApercuComplet)) {
            $cheminApercu = $nomApercu;
        }
    } catch (\Exception $e) {
        $cheminApercu = null;
    }

    $cheminPreuve = $request->file('fichier_preuve')->store('preuves', 'local');

    $memoire = Memoire::create([
        'user_id' => $request->user()->id,
        'titre' => $request->titre,
        'resume' => $request->resume,
        'filiere_id' => $request->filiere_id,
        'sous_filiere_id' => $request->sous_filiere_id,
        'annee' => $request->annee,
        'encadrant' => $request->encadrant,
        'fichier_memoire' => $cheminMemoire,
        'fichier_preuve' => $cheminPreuve,
        'statut' => 'valide',
        'apercu' => $cheminApercu,
        'cycle' => $request->cycle,
        'valide_par' => $request->user()->id,
        'valide_le' => now(),
    ]);

    return response()->json([
        'message' => 'Mémoire ajouté et publié avec succès.',
        'memoire' => $memoire,
    ], 201);
}


public function update(Request $request, Memoire $memoire)
{
    if ($memoire->user_id !== $request->user()->id) {
        return response()->json(['message' => 'Action non autorisée.'], 403);
    }

    if ($memoire->estValide()) {
        return response()->json([
            'message' => 'Un mémoire déjà validé ne peut plus être modifié.',
        ], 409);
    }

    $validator = Validator::make($request->all(), [
        'titre' => 'sometimes|string|max:255',
        'resume' => 'sometimes|string',
        'filiere_id' => 'sometimes|exists:filieres,id',
        'sous_filiere_id' => 'sometimes|nullable|exists:sous_filieres,id',
        'annee' => 'sometimes|string|max:4',
        'cycle' => 'sometimes|in:licence,master',
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

    $donnees = $request->only(['titre', 'resume', 'filiere_id', 'sous_filiere_id', 'annee', 'cycle', 'encadrant']);

    if ($request->hasFile('fichier_memoire')) {
        Storage::disk('local')->delete($memoire->fichier_memoire);
        $donnees['fichier_memoire'] = $request->file('fichier_memoire')->store('memoires', 'local');
    }

    if ($request->hasFile('fichier_preuve')) {
        Storage::disk('local')->delete($memoire->fichier_preuve);
        $donnees['fichier_preuve'] = $request->file('fichier_preuve')->store('preuves', 'local');
    }

    // Si le mémoire était rejeté, la correction le renvoie en attente de validation
    if ($memoire->statut === 'rejete') {
        $donnees['statut'] = 'en_attente';
        $donnees['motif_rejet'] = null;
        $donnees['valide_par'] = null;
        $donnees['valide_le'] = null;
    }

    $memoire->update($donnees);

    return response()->json([
        'message' => $memoire->statut === 'en_attente' && $memoire->wasChanged('statut')
            ? 'Mémoire corrigé et renvoyé pour validation.'
            : 'Mémoire mis à jour avec succès.',
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
        $memoires = Memoire::enAttente()->with(['filiere', 'sousFiliere', 'user.etudiantAutorise'])->latest()->get();

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
        $query = Memoire::with(['filiere', 'sousFiliere', 'user.etudiantAutorise']);

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
     public function apercuPublic(Memoire $memoire)
        {
            if (!$memoire->estValide() || !$memoire->apercu) {
                abort(404);
            }

            return Storage::disk('local')->response($memoire->apercu);
        }
}