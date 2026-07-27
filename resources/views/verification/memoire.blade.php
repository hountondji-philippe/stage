<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification — {{ $memoire->titre }}</title>
</head>
<body style="margin:0; padding:40px 16px; background-color:#EDEAE0; font-family: Arial, Helvetica, sans-serif;">
    <div style="max-width:520px; margin:0 auto; background-color:#FBFAF6; border:1px solid #D9D4C4; border-radius:6px; overflow:hidden;">
        <div style="padding:24px 32px; border-bottom:3px solid #C9A34E; font-family: Georgia, serif; color:#16233F; font-size:20px; font-weight:bold;">
            Mémoires<span style="color:#C9A34E;">+</span>
        </div>
        <div style="padding:32px;">
            <p style="margin:0 0 6px; color:#16233F; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">
                Document authentifié
            </p>
            <h1 style="margin:0 0 20px; font-size:19px; color:#16233F;">{{ $memoire->titre }}</h1>

            <table style="width:100%; border-collapse:collapse; font-size:14px; color:#333;">
                <tr>
                    <td style="padding:6px 0; color:#7A7666; width:160px;">Auteur</td>
                    <td style="padding:6px 0;">{{ $etudiant1->prenom ?? '' }} {{ $etudiant1->nom ?? '' }}</td>
                </tr>
                @if($etudiant2)
                <tr>
                    <td style="padding:6px 0; color:#7A7666;">Co-auteur</td>
                    <td style="padding:6px 0;">{{ $memoire->prenom_binome }} {{ $memoire->nom_binome }}</td>
                </tr>
                @endif
                <tr>
                    <td style="padding:6px 0; color:#7A7666;">Filière</td>
                    <td style="padding:6px 0;">{{ $memoire->filiere->nom ?? '—' }}</td>
                </tr>
                <tr>
                    <td style="padding:6px 0; color:#7A7666;">Année</td>
                    <td style="padding:6px 0;">{{ $memoire->annee }}</td>
                </tr>
                <tr>
                    <td style="padding:6px 0; color:#7A7666;">Validé le</td>
                    <td style="padding:6px 0;">{{ $memoire->valide_le?->format('d/m/Y') ?? '—' }}</td>
                </tr>
            </table>

            <a href="{{ route('memoire.verification.telecharger', ['memoire' => $memoire->id, 'signature' => request('signature'), 'expires' => request('expires')]) }}"
               style="display:inline-block; margin-top:28px; padding:12px 24px; background-color:#16233F; color:#FBFAF6; text-decoration:none; border-radius:4px; font-size:14px;">
                Télécharger le mémoire officiel
            </a>

            <p style="margin-top:24px; font-size:12px; color:#7A7666;">
                Ce document est authentifié par l'École Nationale d'Économie Appliquée et de Management (ENEAM). Toute version différente de celle proposée au téléchargement ci-dessus n'est pas garantie conforme à l'original.
            </p>
        </div>
    </div>
</body>
</html>