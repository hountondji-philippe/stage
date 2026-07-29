<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemoireController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EtudiantAutoriseController;
use App\Http\Controllers\Api\FiliereController;
use App\Http\Controllers\Api\SousFiliereController;
use App\Http\Controllers\Api\ActualiteController;
use App\Http\Controllers\Api\AdminRechercheController;
use App\Http\Controllers\Api\RechercheController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\PeriodeDepotController;

// --- Authentification (public) ---
Route::post('/auth/verifier-matricule', [AuthController::class, 'verifierMatricule']);
Route::post('/auth/verifier-code-l2', [AuthController::class, 'verifierCodeL2']);
Route::post('/auth/activer-compte', [AuthController::class, 'activerCompte']);
Route::post('/auth/renvoyer-lien', [AuthController::class, 'renvoyerLien']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/mot-de-passe-oublie', [AuthController::class, 'demanderReinitialisation']);
Route::post('/auth/reinitialiser-mot-de-passe', [AuthController::class, 'reinitialiserMotDePasse']);
Route::post('/admin/etudiants-autorises/importer', [EtudiantAutoriseController::class, 'importer']);

// --- Consultation : accessible aux comptes complets ET à l'accès L2 (plus d'accès anonyme) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stats-publiques', [MemoireController::class, 'statsPubliques']);
    Route::get('/recherche-globale', [RechercheController::class, 'index']);
    Route::get('/recherche/memoires', [MemoireController::class, 'rechercherPublic']);
    Route::get('/memoires/publics/{memoire}', [MemoireController::class, 'afficherPublic']);
    Route::get('/memoires/{memoire}/fichier', [MemoireController::class, 'fichierPublic']);
    Route::get('/memoires/{memoire}/lien-fichier', [MemoireController::class, 'lienFichierPublic']);
    Route::get('/memoires/{memoire}/telecharger', [MemoireController::class, 'telechargerPublic']);
    Route::get('/memoires/{memoire}/apercu', [MemoireController::class, 'apercuPublic']);
    Route::get('/memoires/plus-consultes', [MemoireController::class, 'plusConsultesPublic']);
    Route::get('/filieres', [FiliereController::class, 'index']);
    Route::get('/sous-filieres', [SousFiliereController::class, 'index']);
    Route::get('/actualites', [ActualiteController::class, 'index']);
    Route::get('/actualites/{actualite}', [ActualiteController::class, 'show']);
});

// --- Actions complètes : réservées aux comptes User (bloque l'accès L2 en lecture seule) ---
Route::middleware(['auth:sanctum', 'lecture.seule'])->group(function () {
    Route::get('/etudiants-autorises/recherche-binome', [EtudiantAutoriseController::class, 'rechercheBinome']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/mot-de-passe', [AuthController::class, 'changerMotDePasse']);
    Route::post('/auth/changer-mot-de-passe', [AuthController::class, 'changerMotDePasse']);
    Route::get('/memoires/mes-memoires', [MemoireController::class, 'mesMemoires']);
    Route::get('/memoires/{memoire}', [MemoireController::class, 'show']);
    Route::get('/mes-memoires/{memoire}/fichier/{type}', [MemoireController::class, 'monFichier']);
    Route::get('/mes-memoires/{memoire}/telecharger/{type}', [MemoireController::class, 'monTelechargement']);
    Route::get('/memoires/{memoire}/mon-telechargement/{type}', [MemoireController::class, 'monTelechargement']);
    Route::post('/memoires', [MemoireController::class, 'store']);
    Route::put('/memoires/{memoire}', [MemoireController::class, 'update']);
    Route::delete('/memoires/{memoire}', [MemoireController::class, 'destroy']);
    Route::get('/mes-tickets', [TicketController::class, 'mesTickets']);
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/periode-depot', [PeriodeDepotController::class, 'statut']);
    Route::get('/binome/confirmation/{token}', [MemoireController::class, 'afficherConfirmationBinome']);
    Route::post('/binome/confirmation/{token}/confirmer', [MemoireController::class, 'confirmerBinome']);
    Route::post('/binome/confirmation/{token}/refuser', [MemoireController::class, 'refuserBinome']);
    Route::get('/binome/confirmation/{token}/fichier/{type}', [MemoireController::class, 'fichierConfirmationBinome']);

    Route::middleware('admin')->group(function () {
        Route::get('/admin/stats', [MemoireController::class, 'stats']);
        Route::get('/admin/memoires/en-attente', [MemoireController::class, 'enAttenteAdmin']);
        Route::get('/admin/memoires', [MemoireController::class, 'tousAdmin']);
        Route::post('/admin/memoires', [MemoireController::class, 'storeAdmin']);
        Route::get('/admin/memoires/{memoire}/fichier/{type}', [MemoireController::class, 'fichierAdmin']);
        Route::post('/admin/memoires/{memoire}/valider', [MemoireController::class, 'valider']);
        Route::post('/admin/memoires/{memoire}/rejeter', [MemoireController::class, 'rejeter']);
        Route::delete('/admin/memoires/{memoire}', [MemoireController::class, 'supprimerAdmin']);
        Route::get('/admin/recherche-globale', [AdminRechercheController::class, 'index']);
        Route::get('/admin/memoires/{memoire}', [MemoireController::class, 'showAdmin']);
        Route::get('/admin/tickets', [TicketController::class, 'tousAdmin']);
        Route::get('/admin/tickets/stats', [TicketController::class, 'statsOuverts']);
        Route::post('/admin/tickets/{ticket}/repondre', [TicketController::class, 'repondre']);
        Route::get('/admin/periodes-depot', [PeriodeDepotController::class, 'index']);
        Route::post('/admin/periodes-depot/lancer', [PeriodeDepotController::class, 'lancer']);
        Route::post('/admin/periodes-depot/{periodeDepot}/fermer', [PeriodeDepotController::class, 'fermer']);
        Route::post('/admin/memoires/{memoire}/renvoyer-fiche', [MemoireController::class, 'renvoyerFiche']);
        
        Route::apiResource('/admin/etudiants-autorises', EtudiantAutoriseController::class)
            ->parameters(['etudiants-autorises' => 'etudiantAutorise']);

        Route::apiResource('/admin/actualites', ActualiteController::class)
            ->except(['index', 'show']);

        Route::apiResource('/admin/filieres', FiliereController::class)
            ->except(['index', 'show']);

        Route::apiResource('/admin/sous-filieres', SousFiliereController::class)
            ->except(['index', 'show']);
        
    });
});

 Route::get('/memoires/{memoire}/fichier-signe', [MemoireController::class, 'fichierSigne'])
    ->middleware('signed')
    ->name('memoires.fichier.signe');
    