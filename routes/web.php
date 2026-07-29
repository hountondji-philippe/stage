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

Route::get('/debug-logs-temp-x7f2', function () {
    $path = storage_path('logs/laravel.log');

    if (!file_exists($path)) {
        return response('Le fichier de log n\'existe pas encore.', 200)
            ->header('Content-Type', 'text/plain');
    }

    $lines = file($path);
    $lastLines = array_slice($lines, -150);

    return response(implode('', $lastLines), 200)
        ->header('Content-Type', 'text/plain');
});
