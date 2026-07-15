<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemoireController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EtudiantAutoriseController;
use App\Http\Controllers\Api\FiliereController;

Route::post('/auth/verifier-matricule', [AuthController::class, 'verifierMatricule']);
Route::post('/auth/activer-compte', [AuthController::class, 'activerCompte']);
Route::post('/auth/renvoyer-lien', [AuthController::class, 'renvoyerLien']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/admin/stats', [MemoireController::class, 'stats']);
Route::get('/recherche/memoires', [MemoireController::class, 'rechercherPublic']);
Route::get('/memoires/publics/{memoire}', [MemoireController::class, 'afficherPublic']);
Route::get('/memoires/{memoire}/fichier', [MemoireController::class, 'fichierPublic']);
Route::get('/memoires/{memoire}/telecharger', [MemoireController::class, 'telechargerPublic']);
Route::get('/filieres', [FiliereController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/mot-de-passe', [AuthController::class, 'changerMotDePasse']);

    Route::get('/memoires/mes-memoires', [MemoireController::class, 'mesMemoires']);
    Route::post('/memoires', [MemoireController::class, 'store']);
    Route::put('/memoires/{memoire}', [MemoireController::class, 'update']);
    Route::delete('/memoires/{memoire}', [MemoireController::class, 'destroy']);

    Route::middleware('admin')->group(function () {
        Route::get('/admin/memoires/en-attente', [MemoireController::class, 'enAttenteAdmin']);
        Route::get('/admin/memoires', [MemoireController::class, 'tousAdmin']);
        Route::get('/admin/memoires/{memoire}/fichier/{type}', [MemoireController::class, 'fichierAdmin']);
        Route::post('/admin/memoires/{memoire}/valider', [MemoireController::class, 'valider']);
        Route::post('/admin/memoires/{memoire}/rejeter', [MemoireController::class, 'rejeter']);
        Route::delete('/admin/memoires/{memoire}', [MemoireController::class, 'supprimerAdmin']);

        Route::apiResource('/admin/etudiants-autorises', EtudiantAutoriseController::class)
            ->parameters(['etudiants-autorises' => 'etudiantAutorise']);

        Route::apiResource('/admin/filieres', FiliereController::class)
            ->except(['index', 'show']);
    });
});