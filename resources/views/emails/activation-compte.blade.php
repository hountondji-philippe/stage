@extends('emails.layout')

@section('content')
    <p style="margin:0 0 4px; color:#7A7666; font-size:11px; text-transform:uppercase; letter-spacing:1px; font-family: Arial, sans-serif;">
        Activation de compte
    </p>
    <h2 style="margin:0 0 20px; color:#16233F; font-size:22px; font-family: Georgia, serif;">
        Bienvenue, {{ $etudiantAutorise->prenom }}
    </h2>

    <p style="margin:0 0 16px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Votre inscription sur Mémoires+ a été confirmée par la scolarité de l'ENEAM. Il vous reste une dernière étape : activer votre compte pour pouvoir déposer votre mémoire et consulter les travaux de vos filières.
    </p>

    <p style="margin:0 0 8px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Ce lien est valable <strong>48 heures</strong>.
    </p>

    @include('emails.partials.bouton', [
        'url' => config('app.frontend_url') . '/activation/' . $etudiantAutorise->token_activation,
        'libelle' => 'Activer mon compte',
    ])

    <p style="margin:24px 0 0; color:#A39F8E; font-size:12.5px; line-height:1.6;">
        Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
    </p>
@endsection