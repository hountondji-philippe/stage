<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #222; }
    .header { text-align: center; margin-bottom: 15px; }
    .header h2 { margin: 0; font-size: 15px; }
    .titre { text-align: center; font-size: 16px; font-weight: bold; margin: 18px 0; text-decoration: underline; }
    .section-title { color: #16247d; font-weight: bold; margin-top: 16px; margin-bottom: 6px; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
    td { padding: 4px 0; border-bottom: 1px dotted #ccc; }
    td.label { font-weight: bold; width: 220px; }
    .pieces ol { margin-top: 6px; padding-left: 18px; }
    .pieces li { margin-bottom: 4px; }
    .footer { margin-top: 35px; font-size: 10px; text-align: right; color: #777; }
</style>
</head>
<body>
    <div class="header">
        <h2>REPUBLIQUE DU BENIN</h2>
        <p>Université d'Abomey-Calavi</p>
    </div>

    <div class="titre">Fiche de dépôt mémoire</div>

    <div class="section-title">INFORMATIONS DE L'ÉTUDIANT 1</div>
    <table>
        <tr><td class="label">Matricule 1 :</td><td>{{ $etudiant1->matricule ?? '—' }}</td></tr>
        <tr><td class="label">Nom &amp; Prénoms :</td><td>{{ $etudiant1->nom ?? '' }} {{ $etudiant1->prenom ?? '' }}</td></tr>
    </table>

    @if($memoire->estBinome())
    <div class="section-title">INFORMATIONS DE L'ÉTUDIANT 2</div>
    <table>
        <tr><td class="label">Matricule 2 :</td><td>{{ $memoire->matricule_binome }}</td></tr>
        <tr><td class="label">Nom &amp; Prénoms :</td><td>{{ $memoire->nom_binome }} {{ $memoire->prenom_binome }}</td></tr>
    </table>
    @endif

    <table>
        <tr><td class="label">Filière :</td><td>{{ $memoire->filiere->nom ?? '' }}</td></tr>
        <tr><td class="label">Cycle :</td><td>{{ ucfirst($memoire->cycle) }}</td></tr>
    </table>

    <div class="section-title">INFORMATIONS SUR LE MÉMOIRE</div>
    <table>
        <tr><td class="label">Thème du mémoire :</td><td>{{ $memoire->titre }}</td></tr>
        <tr><td class="label">Encadrant :</td><td>{{ $memoire->encadrant }}</td></tr>
        <tr><td class="label">Année :</td><td>{{ $memoire->annee }}</td></tr>
        <tr><td class="label">Date de dépôt :</td><td>{{ $memoire->created_at->format('d/m/Y') }}</td></tr>
    </table>

    <div class="pieces">
        <p>Veuillez vous munir des pièces suivantes pour effectuer le dépôt physique :</p>
        <ol>
            <li>Fiche de dépôt en ligne (ce document)</li>
            <li>Attestation d'inscription</li>
            <li>Fiche(s) de note(s) de stage sous pli fermé portant les noms, prénoms, filière et année académique</li>
            <li>Fiche d'autorisation de dépôt</li>
            <li>Deux exemplaires du mémoire</li>
            <li>Copie de la lettre de recommandation de stage</li>
        </ol>
    </div>

    <div class="footer">
        Document généré le {{ now()->format('d/m/Y') }} — Portail Mémoires+
    </div>
</body>
</html>