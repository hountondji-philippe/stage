<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #1f2937;">
    <h2>Activation de votre compte Mémoires+</h2>

    <p>Bonjour {{ $etudiantAutorise->prenom }},</p>

    <p>
        Vous pouvez activer votre compte étudiant en cliquant sur le lien ci-dessous.
        Ce lien est valable 48 heures.
    </p>

    <p>
        <a href="{{ config('app.frontend_url') }}/activation/{{ $etudiantAutorise->token_activation }}">
            Activer mon compte
        </a>
    </p>

    <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.</p>
</body>
</html>