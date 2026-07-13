<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/verifier-matricule', [AuthController::class, 'verifierMatricule']);
Route::post('/auth/activer-compte', [AuthController::class, 'activerCompte']);
Route::post('/auth/renvoyer-lien', [AuthController::class, 'renvoyerLien']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
});