@extends('emails.layout')

@section('content')
    <p style="margin:0 0 4px; color:#7A7666; font-size:11px; text-transform:uppercase; letter-spacing:1px; font-family: Arial, sans-serif;">
        Dépôt enregistré
    </p>
    <h2 style="margin:0 0 20px; color:#16233F; font-size:22px; font-family: Georgia, serif;">
        Bonjour {{ $prenomDestinataire }}
    </h2>

    <p style="margin:0 0 16px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Votre dépôt pour le mémoire <strong>« {{ $memoire->titre }} »</strong> a bien été enregistré et transmis à la scolarité pour examen.
    </p>

    <p style="margin:0 0 16px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Vous trouverez ci-joint votre fiche de dépôt, qui fait office de preuve. Elle reste également disponible au téléchargement depuis votre espace personnel à tout moment.
    </p>
@endsection