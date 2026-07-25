@extends('emails.layout')

@section('content')
    <p style="margin:0 0 4px; color:#7A7666; font-size:11px; text-transform:uppercase; letter-spacing:1px; font-family: Arial, sans-serif;">
        Dépôt en binôme
    </p>
    <h2 style="margin:0 0 20px; color:#16233F; font-size:22px; font-family: Georgia, serif;">
        Confirmation de votre participation
    </h2>

    <p style="margin:0 0 16px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        <strong>{{ $memoire->user->etudiantAutorise->prenom ?? '' }} {{ $memoire->user->etudiantAutorise->nom ?? '' }}</strong> vous a désigné comme binôme pour le mémoire suivant :
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F5F0; border-left:3px solid #C9A34E; margin:0 0 20px;">
        <tr>
            <td style="padding:16px 20px;">
                <p style="margin:0 0 4px; color:#16233F; font-size:15px; font-weight:bold;">{{ $memoire->titre }}</p>
                <p style="margin:0; color:#7A7666; font-size:13px;">Année {{ $memoire->annee }} — Cycle {{ $memoire->cycle }}</p>
            </td>
        </tr>
    </table>

    <p style="margin:0 0 8px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Merci de vous connecter à votre espace pour confirmer ou refuser cette association. Le dépôt ne sera transmis à la scolarité qu'après votre confirmation.
    </p>

    @include('emails.partials.bouton', [
        'url' => config('app.frontend_url') . '/espace/confirmation-binome/' . $memoire->binome_token,
        'libelle' => 'Voir la demande',
    ])

    <p style="margin:24px 0 0; color:#A39F8E; font-size:12.5px; line-height:1.6;">
        Si vous n'êtes pas concerné par ce dépôt, vous pouvez ignorer cet email ou le refuser depuis votre espace.
    </p>
@endsection