@extends('emails.layout')

@section('content')
    <p style="margin:0 0 4px; color:#7A7666; font-size:11px; text-transform:uppercase; letter-spacing:1px; font-family: Arial, sans-serif;">
        Sécurité du compte
    </p>
    <h2 style="margin:0 0 20px; color:#0F2474; font-size:22px; font-family: Georgia, serif;">
        Réinitialisation de votre mot de passe
    </h2>

    <p style="margin:0 0 16px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Vous avez demandé la réinitialisation de votre mot de passe sur Mémoires+.
    </p>

    <p style="margin:0 0 8px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Ce lien est valable <strong>60 minutes</strong>.
    </p>

    @include('emails.partials.bouton', [
        'url' => config('app.frontend_url') . '/reinitialiser-mot-de-passe/' . $token . '?email=' . urlencode($email),
        'libelle' => 'Réinitialiser mon mot de passe',
    ])

    <p style="margin:24px 0 0; color:#A39F8E; font-size:12.5px; line-height:1.6;">
        Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
    </p>
@endsection