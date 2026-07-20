<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemoireController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EtudiantAutoriseController;
use App\Http\Controllers\Api\FiliereController;
use App\Http\Controllers\Api\SousFiliereController;
use App\Http\Controllers\Api\ActualiteController;
use App\Http\Controllers\Api\AdminRechercheController;

Route::post('/auth/verifier-matricule', [AuthController::class, 'verifierMatricule']);
Route::post('/auth/activer-compte', [AuthController::class, 'activerCompte']);
Route::post('/auth/renvoyer-lien', [AuthController::class, 'renvoyerLien']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/mot-de-passe-oublie', [AuthController::class, 'demanderReinitialisation']);
Route::post('/auth/reinitialiser-mot-de-passe', [AuthController::class, 'reinitialiserMotDePasse']);
Route::post('/admin/etudiants-autorises/importer', [EtudiantAutoriseController::class, 'importer']);
Route::get('/stats-publiques', [MemoireController::class, 'statsPubliques']);

Route::get('/admin/stats', [MemoireController::class, 'stats']);
Route::get('/recherche/memoires', [MemoireController::class, 'rechercherPublic']);
Route::get('/memoires/publics/{memoire}', [MemoireController::class, 'afficherPublic']);
Route::get('/memoires/{memoire}/fichier', [MemoireController::class, 'fichierPublic']);
Route::get('/memoires/{memoire}/telecharger', [MemoireController::class, 'telechargerPublic']);
Route::get('/filieres', [FiliereController::class, 'index']);
Route::get('/sous-filieres', [SousFiliereController::class, 'index']);
Route::get('/memoires/{memoire}/apercu', [MemoireController::class, 'apercuPublic']);
Route::get('/recherche/memoires', [MemoireController::class, 'rechercherPublic']);
Route::get('/memoires/plus-consultes', [MemoireController::class, 'plusConsultesPublic']);
Route::get('/actualites', [ActualiteController::class, 'index']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/mot-de-passe', [AuthController::class, 'changerMotDePasse']);
    Route::post('/auth/changer-mot-de-passe', [AuthController::class, 'changerMotDePasse']);
    Route::get('/memoires/mes-memoires', [MemoireController::class, 'mesMemoires']);
    Route::get('/mes-memoires/{memoire}/fichier/{type}', [MemoireController::class, 'monFichier']);
    Route::get('/mes-memoires/{memoire}/telecharger/{type}', [MemoireController::class, 'monTelechargement']);
    Route::get('/memoires/{memoire}/mon-telechargement/{type}', [MemoireController::class, 'monTelechargement']);
    Route::post('/memoires', [MemoireController::class, 'store']);
    Route::put('/memoires/{memoire}', [MemoireController::class, 'update']);
    Route::delete('/memoires/{memoire}', [MemoireController::class, 'destroy']);

    Route::middleware('admin')->group(function () {
        Route::get('/admin/memoires/en-attente', [MemoireController::class, 'enAttenteAdmin']);
        Route::get('/admin/memoires', [MemoireController::class, 'tousAdmin']);
        Route::post('/admin/memoires', [MemoireController::class, 'storeAdmin']);
        Route::get('/admin/memoires/{memoire}/fichier/{type}', [MemoireController::class, 'fichierAdmin']);
        Route::post('/admin/memoires/{memoire}/valider', [MemoireController::class, 'valider']);
        Route::post('/admin/memoires/{memoire}/rejeter', [MemoireController::class, 'rejeter']);
        Route::delete('/admin/memoires/{memoire}', [MemoireController::class, 'supprimerAdmin']);
        Route::get('/admin/recherche-globale', [AdminRechercheController::class, 'index']);
        Route::get('/admin/memoires/{memoire}', [MemoireController::class, 'showAdmin']);
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