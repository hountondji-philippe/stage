<?php

namespace App\Http\Middleware;

use App\Models\AccesL2;
use Closure;
use Illuminate\Http\Request;

class RestreindreLectureSeule
{
    /**
     * Bloque les actions d'écriture pour un accès L2 (lecture seule).
     * Les comptes complets (User) passent sans restriction.
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() instanceof AccesL2) {
            return response()->json([
                'message' => 'Cette action nécessite un compte complet (Licence 3, Master 1 ou Master 2).',
            ], 403);
        }

        return $next($request);
    }
}