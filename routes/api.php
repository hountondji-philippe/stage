<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/verifier-matricule', [AuthController::class, 'verifierMatricule']);
Route::post('/auth/activer-compte', [AuthController::class, 'activerCompte']);