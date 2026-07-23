<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Memoire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Process;
use App\Models\EtudiantAutorise;
use App\Models\Filiere;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\PeriodeDepot;

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
    
    public function plusConsultesPublic()
{
    $memoires = Memoire::valides()
        ->with(['filiere', 'sousFiliere', 'user.etudiantAutorise'])
        ->orderByDesc('views_count')
        ->limit(10)
        ->get();

    return response()->json(['memoires' => $memoires]);
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
    if (!PeriodeDepot::estOuverte()) {
        return response()->json([
            'message' => 'La période de dépôt des mémoires est actuellement fermée.',
        ], 403);
    }

    $etudiant1 = $request->user()->etudiantAutorise;
    $niveauActuel = $etudiant1?->niveau;

    if (!$niveauActuel) {
        return response()->json([
            'message' => 'Votre niveau n\'est pas renseigné. Contactez l\'administration.',
        ], 422);
    }

    $depotExistant = $request->user()->memoires()->where('niveau', $niveauActuel)->exists();

    if ($depotExistant) {
        return response()->json([
            'message' => "Vous avez déjà un dépôt pour votre niveau actuel ({$niveauActuel}). En cas de rejet, corrigez et renvoyez ce dépôt plutôt que d'en créer un nouveau.",
        ], 409);
    }

    $validator = Validator::make($request->all(), [
        'titre' => 'required|string|max:255',
        'resume' => 'required|string',
        'filiere_id' => 'required|exists:filieres,id',
        'sous_filiere_id' => 'nullable|exists:sous_filieres,id',
        'annee' => 'required|string|max:4',
        'encadrant' => 'required|string|max:255',
        'fichier_memoire' => 'required|file|mimes:pdf|max:10240',
        'cycle' => 'required|in:licence,master',
        'mode_depot' => 'required|in:unique,binome',
        'matricule_binome' => 'required_if:mode_depot,binome|nullable|string|exists:etudiants_autorises,matricule',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Données invalides.',
            'errors' => $validator->errors(),
        ], 422);
    }

    $nomBinome = null;
    $prenomBinome = null;

    if ($request->mode_depot === 'binome') {
        if ($request->matricule_binome === ($etudiant1->matricule ?? null)) {
            return response()->json([
                'message' => 'Le matricule du binôme ne peut pas être le vôtre.',
            ], 422);
        }

        $etudiantBinome = EtudiantAutorise::where('matricule', $request->matricule_binome)->first();

        if (!$etudiantBinome || !$etudiantBinome->compte_active) {
            return response()->json([
                'message' => 'Ce matricule ne correspond à aucun étudiant autorisé actif.',
            ], 422);
        }

        $nomBinome = $etudiantBinome->nom;
        $prenomBinome = $etudiantBinome->prenom;
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

    $memoire = Memoire::create([
        'user_id' => $request->user()->id,
        'titre' => $request->titre,
        'resume' => $request->resume,
        'filiere_id' => $request->filiere_id,
        'sous_filiere_id' => $request->sous_filiere_id,
        'annee' => $request->annee,
        'niveau' => $niveauActuel,
        'encadrant' => $request->encadrant,
        'fichier_memoire' => $cheminMemoire,
        'statut' => 'en_attente',
        'apercu' => $cheminApercu,
        'cycle' => $request->cycle,
        'mode_depot' => $request->mode_depot,
        'matricule_binome' => $request->mode_depot === 'binome' ? $request->matricule_binome : null,
        'nom_binome' => $nomBinome,
        'prenom_binome' => $prenomBinome,
    ]);

    $cheminFiche = $this->genererFicheDepot($memoire, $etudiant1);
    $memoire->update(['fichier_preuve' => $cheminFiche]);

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

    if (!$memoire->estEnAttente() && !$memoire->estRejete()) {
        return response()->json([
            'message' => 'Seul un mémoire en attente ou rejeté peut être modifié.',
        ], 409);
    }

    if ($memoire->estRejete() && !PeriodeDepot::estOuverte()) {
        return response()->json([
            'message' => 'La période de dépôt est fermée, vous ne pouvez pas renvoyer ce mémoire pour le moment.',
        ], 403);
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
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Données invalides.',
            'errors' => $validator->errors(),
        ], 422);
    }

    $donnees = $request->only(['titre', 'resume', 'filiere_id', 'sous_filiere_id', 'annee', 'cycle', 'encadrant']);
    $regenererFiche = $request->hasFile('fichier_memoire')
        || $request->filled('titre')
        || $request->filled('encadrant')
        || $request->filled('cycle')
        || $request->filled('filiere_id');

    if ($request->hasFile('fichier_memoire')) {
        Storage::disk('local')->delete($memoire->fichier_memoire);
        $donnees['fichier_memoire'] = $request->file('fichier_memoire')->store('memoires', 'local');
    }

    $etaitRejete = $memoire->estRejete();

    if ($etaitRejete) {
        $donnees['statut'] = 'en_attente';
        $donnees['motif_rejet'] = null;
        $donnees['valide_par'] = null;
        $donnees['valide_le'] = null;
    }

    $memoire->update($donnees);

    if ($regenererFiche) {
        $etudiant1 = $request->user()->etudiantAutorise;
        if ($memoire->fichier_preuve) {
            Storage::disk('local')->delete($memoire->fichier_preuve);
        }
        $cheminFiche = $this->genererFicheDepot($memoire, $etudiant1);
        $memoire->update(['fichier_preuve' => $cheminFiche]);
    }

    return response()->json([
        'message' => $etaitRejete
            ? 'Mémoire corrigé et renvoyé pour validation.'
            : 'Mémoire mis à jour avec succès.',
        'memoire' => $memoire,
    ]);
}

private function genererFicheDepot(Memoire $memoire, ?EtudiantAutorise $etudiant1): string
{
    Storage::disk('local')->makeDirectory('fiches');
    $nomFichier = 'fiches/' . Str::random(40) . '.pdf';
    $cheminComplet = Storage::disk('local')->path($nomFichier);

    $etudiant1?->load('filiere');

    $etudiant2 = null;
    if ($memoire->estBinome() && $memoire->matricule_binome) {
        $etudiant2 = EtudiantAutorise::with('filiere')
            ->where('matricule', $memoire->matricule_binome)
            ->first();
    }

    $logoUac = $this->encoderLogo(public_path('images/logo-uac.png'));
    $logoEneam = $this->encoderLogo(public_path('images/logo-memoires-plus.png'));

    Pdf::loadView('pdf.fiche-depot', [
        'memoire' => $memoire,
        'etudiant1' => $etudiant1,
        'etudiant2' => $etudiant2,
        'logoUac' => $logoUac,
        'logoEneam' => $logoEneam,
    ])->save($cheminComplet);

    return $nomFichier;
}

private function encoderLogo(string $chemin): ?string
{
    if (!file_exists($chemin)) {
        return null;
    }

    $type = pathinfo($chemin, PATHINFO_EXTENSION);
    $data = file_get_contents($chemin);

    return 'data:image/' . $type . ';base64,' . base64_encode($data);
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
        'cycle' => 'required|in:licence,master',
        'etudiant_autorise_id' => 'required|exists:etudiant_autorises,id',
        'mode_depot' => 'required|in:unique,binome',
        'matricule_binome' => 'required_if:mode_depot,binome|nullable|string|exists:etudiant_autorises,matricule',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Données invalides.',
            'errors' => $validator->errors(),
        ], 422);
    }

    $etudiantAuteur = EtudiantAutorise::find($request->etudiant_autorise_id);

    if (!$etudiantAuteur || !$etudiantAuteur->user_id) {
        return response()->json([
            'message' => "L'étudiant sélectionné n'a pas de compte utilisateur associé.",
        ], 422);
    }

    $nomBinome = null;
    $prenomBinome = null;

    if ($request->mode_depot === 'binome') {
        if ($request->matricule_binome === $etudiantAuteur->matricule) {
            return response()->json([
                'message' => "L'auteur principal et le binôme ne peuvent pas être la même personne.",
            ], 422);
        }

        $etudiantBinome = EtudiantAutorise::where('matricule', $request->matricule_binome)->first();

        if (!$etudiantBinome || !$etudiantBinome->compte_active) {
            return response()->json([
                'message' => 'Ce matricule ne correspond à aucun étudiant autorisé actif.',
            ], 422);
        }

        $nomBinome = $etudiantBinome->nom;
        $prenomBinome = $etudiantBinome->prenom;
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

    $memoire = Memoire::create([
        'user_id' => $etudiantAuteur->user_id,
        'titre' => $request->titre,
        'resume' => $request->resume,
        'filiere_id' => $request->filiere_id,
        'sous_filiere_id' => $request->sous_filiere_id,
        'annee' => $request->annee,
        'encadrant' => $request->encadrant,
        'fichier_memoire' => $cheminMemoire,
        'statut' => 'valide',
        'apercu' => $cheminApercu,
        'cycle' => $request->cycle,
        'mode_depot' => $request->mode_depot,
        'matricule_binome' => $request->mode_depot === 'binome' ? $request->matricule_binome : null,
        'nom_binome' => $nomBinome,
        'prenom_binome' => $prenomBinome,
        'valide_par' => $request->user()->id,
        'valide_le' => now(),
    ]);

    $cheminFiche = $this->genererFicheDepot($memoire, $etudiantAuteur);
    $memoire->update(['fichier_preuve' => $cheminFiche]);

    return response()->json([
        'message' => 'Mémoire ajouté et publié avec succès.',
        'memoire' => $memoire,
    ], 201);
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

    if ($request->filled('filiere_id')) {
        $query->where('filiere_id', $request->filiere_id);
    }

    if ($request->filled('sous_filiere_id')) {
        $query->where('sous_filiere_id', $request->sous_filiere_id);
    }

    $memoires = $query->latest()->paginate(15);

    return response()->json($memoires);
}
     public function showAdmin(Memoire $memoire)
{
    return response()->json([
        'memoire' => $memoire->load(['filiere', 'sousFiliere', 'user.etudiantAutorise']),
    ]);
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
        public function statsPubliques()
{
    return response()->json([
        'memoires_deposes' => Memoire::where('statut', 'valide')->count(),
        'filieres_couvertes' => Filiere::count(),
        'etudiants_inscrits' => EtudiantAutorise::where('compte_active', true)->count(),
    ]);
}
public function show(Request $request, Memoire $memoire)
{
    if ($memoire->user_id !== $request->user()->id) {
        return response()->json(['message' => 'Accès non autorisé.'], 403);
    }

    return response()->json([
        'memoire' => $memoire->load(['filiere', 'sousFiliere']),
    ]);
}
}