<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #222; }
    .header-table { width: 100%; margin-bottom: 10px; }
    .header-table td { border: none; padding: 0; vertical-align: middle; }
    .logo-left { width: 75px; }
    .logo-right { width: 75px; }
    .header-center { text-align: center; }
    .header-center h2 { margin: 0; font-size: 15px; }
    .header-center p { margin: 2px 0 0; }
    .titre { text-align: center; font-size: 16px; font-weight: bold; margin: 18px 0; text-decoration: underline; }
    .section-title { color: #16247d; font-weight: bold; margin-top: 16px; margin-bottom: 6px; font-size: 13px; }
    table.infos { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
    table.infos td { padding: 4px 0; border-bottom: 1px dotted #ccc; }
    td.label { font-weight: bold; width: 220px; }
    .note-finale { margin-top: 25px; font-style: italic; }
    .footer { margin-top: 35px; font-size: 10px; text-align: right; color: #777; }
</style>
</head>
<body>

    <table class="header-table">
        <tr>
            <td style="width: 90px;">
                @if($logoUac)
                    <img src="{{ $logoUac }}" class="logo-left">
                @endif
            </td>
            <td class="header-center">
                <h2>REPUBLIQUE DU BENIN</h2>
                <p>Université d'Abomey-Calavi</p>
                <p>Ecole Nationale d'Economie Appliquée et de Management (ENEAM)</p>
            </td>
            <td style="width: 90px; text-align: right;">
                @if($logoEneam)
                    <img src="{{ $logoEneam }}" class="logo-right">
                @endif
            </td>
        </tr>
    </table>

    <div class="titre">Fiche de dépôt mémoire</div>

    <div class="section-title">INFORMATIONS DE L'ÉTUDIANT 1</div>
    <table class="infos">
        <tr><td class="label">Matricule 1 :</td><td>{{ $etudiant1->matricule ?? '—' }}</td></tr>
        <tr><td class="label">Nom &amp; Prénoms :</td><td>{{ $etudiant1->nom ?? '' }} {{ $etudiant1->prenom ?? '' }}</td></tr>
        <tr><td class="label">Filière :</td><td>{{ $etudiant1->filiere->nom ?? '—' }}</td></tr>
        <tr><td class="label">Classe / Niveau :</td><td>{{ $etudiant1->niveau ?? '—' }}</td></tr>
    </table>

    @if($memoire->estBinome())
    <div class="section-title">INFORMATIONS DE L'ÉTUDIANT 2</div>
    <table class="infos">
        <tr><td class="label">Matricule 2 :</td><td>{{ $memoire->matricule_binome }}</td></tr>
        <tr><td class="label">Nom &amp; Prénoms :</td><td>{{ $memoire->nom_binome }} {{ $memoire->prenom_binome }}</td></tr>
        <tr><td class="label">Filière :</td><td>{{ $etudiant2->filiere->nom ?? '—' }}</td></tr>
        <tr><td class="label">Classe / Niveau :</td><td>{{ $etudiant2->niveau ?? '—' }}</td></tr>
    </table>
    @endif

    <div class="section-title">INFORMATIONS SUR LE MÉMOIRE</div>
    <table class="infos">
        <tr><td class="label">Thème du mémoire :</td><td>{{ $memoire->titre }}</td></tr>
        <tr><td class="label">Encadrant :</td><td>{{ $memoire->encadrant }}</td></tr>
        <tr><td class="label">Cycle :</td><td>{{ ucfirst($memoire->cycle) }}</td></tr>
        <tr><td class="label">Année :</td><td>{{ $memoire->annee }}</td></tr>
        <tr><td class="label">Date de dépôt :</td><td>{{ $memoire->created_at->format('d/m/Y') }}</td></tr>
    </table>

    <p class="note-finale">Veuillez vous rapprocher de l'administration pour effectuer le dépôt physique.</p>
    
    <table style="width:100%; margin-top:25px;">
    <tr>
        <td style="width:100px; vertical-align:top;">
            <img src="{{ $qrCode }}" style="width:90px; height:90px;">
        </td>
        <td style="vertical-align:top; font-size:10px; color:#555; padding-left:10px;">
            Scannez ce code pour vérifier l'authenticité de ce document et accéder à la version officielle hébergée par l'ENEAM.
        </td>
    </tr>
</table>

    <div class="footer">
        Document généré le {{ now()->format('d/m/Y') }} — Portail Mémoires+
    </div>
</body>
</html>