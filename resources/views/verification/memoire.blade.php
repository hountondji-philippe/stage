<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification — {{ $memoire->titre }}</title>
</head>
<body style="margin:0; padding:40px 16px; background-color:#EEF1FA; font-family: Arial, Helvetica, sans-serif;">
    <div style="max-width:520px; margin:0 auto; background-color:#FFFFFF; border:1px solid #D7DEF2; border-radius:8px; overflow:hidden; box-shadow:0 4px 16px rgba(0,19,105,0.08);">
        <div style="padding:24px 32px; background:#001369; background:linear-gradient(135deg, #001369 0%, #2545C1 100%); font-family: Georgia, serif; color:#FFFFFF; font-size:20px; font-weight:bold;">
            Mémoires<span style="color:#9FB2F0;">+</span>
        </div>
        <div style="padding:32px;">
            <p style="margin:0 0 6px; color:#2545C1; font-size:13px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">
                Document authentifié
            </p>
            <h1 style="margin:0 0 20px; font-size:19px; color:#001369;">{{ $memoire->titre }}</h1>

            <table style="width:100%; border-collapse:collapse; font-size:14px; color:#333;">
                <tr>
                    <td style="padding:6px 0; color:#5A6BA8; width:160px;">Auteur</td>
                    <td style="padding:6px 0; color:#001369;">{{ $etudiant1->prenom ?? '' }} {{ $etudiant1->nom ?? '' }}</td>
                </tr>
                @if($etudiant2)
                <tr>
                    <td style="padding:6px 0; color:#5A6BA8;">Co-auteur</td>
                    <td style="padding:6px 0; color:#001369;">{{ $memoire->prenom_binome }} {{ $memoire->nom_binome }}</td>
                </tr>
                @endif
                <tr>
                    <td style="padding:6px 0; color:#5A6BA8;">Filière</td>
                    <td style="padding:6px 0; color:#001369;">{{ $memoire->filiere->nom ?? '—' }}</td>
                </tr>
                <tr>
                    <td style="padding:6px 0; color:#5A6BA8;">Année</td>
                    <td style="padding:6px 0; color:#001369;">{{ $memoire->annee }}</td>
                </tr>
                <tr>
                    <td style="padding:6px 0; color:#5A6BA8;">Validé le</td>
                    <td style="padding:6px 0; color:#001369;">{{ $memoire->valide_le?->format('d/m/Y') ?? '—' }}</td>
                </tr>
            </table>

            <a href="{{ route('memoire.verification.telecharger', ['memoire' => $memoire->id]) }}"
               style="display:inline-block; margin-top:28px; padding:12px 24px; background:#001369; background:linear-gradient(135deg, #001369 0%, #2545C1 100%); color:#FFFFFF; text-decoration:none; border-radius:4px; font-size:14px; font-weight:bold;">
                Télécharger le mémoire officiel
            </a>

            <p style="margin-top:24px; font-size:12px; color:#5A6BA8;">
                Ce document est authentifié par l'École Nationale d'Économie Appliquée et de Management (ENEAM). Toute version différente de celle proposée au téléchargement ci-dessus n'est pas garantie conforme à l'original.
            </p>
        </div>
    </div>
</body>
</html>