<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ActivationCompteMail;
use App\Models\EtudiantAutorise;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Niveaux autorisés à créer un compte.
     */
    protected array $niveauxAutorises = ['L3', 'M1', 'M2'];

    public function verifierMatricule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'matricule' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Le matricule est obligatoire.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $etudiantAutorise = EtudiantAutorise::where('matricule', $request->matricule)->first();

        if (!$etudiantAutorise) {
            return response()->json([
                'message' => 'Matricule non reconnu. Contactez l\'administration.',
            ], 404);
        }

        if ($etudiantAutorise->compte_active) {
            return response()->json([
                'message' => 'Un compte existe déjà pour ce matricule. Connectez-vous ou réinitialisez votre mot de passe.',
            ], 409);
        }

        if (!in_array($etudiantAutorise->niveau, $this->niveauxAutorises)) {
            return response()->json([
                'message' => 'La création de compte est réservée aux étudiants de Licence 3, Master 1 et Master 2.',
            ], 403);
        }

        $etudiantAutorise->token_activation = Str::random(64);
        $etudiantAutorise->token_expires_at = now()->addHours(48);
        $etudiantAutorise->save();

        Mail::to($etudiantAutorise->email)->send(new ActivationCompteMail($etudiantAutorise));

        return response()->json([
            'message' => 'Un email d\'activation a été envoyé à l\'adresse enregistrée pour ce matricule.',
        ]);
    }

    public function activerCompte(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $etudiantAutorise = EtudiantAutorise::where('token_activation', $request->token)->first();

        if (!$etudiantAutorise) {
            return response()->json([
                'message' => 'Lien d\'activation invalide.',
            ], 404);
        }

        if ($etudiantAutorise->compte_active) {
            return response()->json([
                'message' => 'Ce compte est déjà activé.',
            ], 409);
        }

        if (now()->isAfter($etudiantAutorise->token_expires_at)) {
            return response()->json([
                'message' => 'Ce lien d\'activation a expiré. Demandez un nouveau lien.',
            ], 410);
        }

        // Sécurité supplémentaire : même si le token est valide,
        // on revérifie le niveau au cas où il aurait changé entre-temps.
        if (!in_array($etudiantAutorise->niveau, $this->niveauxAutorises)) {
            return response()->json([
                'message' => 'La création de compte est réservée aux étudiants de Licence 3, Master 1 et Master 2.',
            ], 403);
        }

        $user = User::create([
            'email' => $etudiantAutorise->email,
            'password' => Hash::make($request->password),
            'role' => 'etudiant',
            'etudiant_autorise_id' => $etudiantAutorise->id,
        ]);

        $etudiantAutorise->compte_active = true;
        $etudiantAutorise->token_activation = null;
        $etudiantAutorise->token_expires_at = null;
        $etudiantAutorise->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Compte activé avec succès.',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    public function renvoyerLien(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'matricule' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Le matricule est obligatoire.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $etudiantAutorise = EtudiantAutorise::where('matricule', $request->matricule)->first();

        if (!$etudiantAutorise) {
            return response()->json([
                'message' => 'Matricule non reconnu. Contactez l\'administration.',
            ], 404);
        }

        if ($etudiantAutorise->compte_active) {
            return response()->json([
                'message' => 'Un compte existe déjà pour ce matricule. Connectez-vous.',
            ], 409);
        }

        if (!in_array($etudiantAutorise->niveau, $this->niveauxAutorises)) {
            return response()->json([
                'message' => 'La création de compte est réservée aux étudiants de Licence 3, Master 1 et Master 2.',
            ], 403);
        }

        $etudiantAutorise->token_activation = Str::random(64);
        $etudiantAutorise->token_expires_at = now()->addHours(48);
        $etudiantAutorise->save();

        Mail::to($etudiantAutorise->email)->send(new ActivationCompteMail($etudiantAutorise));

        return response()->json([
            'message' => 'Un nouveau lien d\'activation a été envoyé.',
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Données invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants incorrects.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie.',
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load('etudiantAutorise'),
        ]);
    }
}