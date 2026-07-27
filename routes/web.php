<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\Api\MemoireController;

Route::get('/verification/{memoire}', [MemoireController::class, 'verifierFiche'])
    ->name('memoire.verification')
    ->middleware('signed');

Route::get('/verification/{memoire}/telecharger', [MemoireController::class, 'telechargerVerification'])
    ->name('memoire.verification.telecharger')
    ->middleware('signed');
