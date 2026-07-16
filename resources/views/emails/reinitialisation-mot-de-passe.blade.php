<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #14284A;">
    <h2>Reinitialisation de votre mot de passe</h2>

    <p>Vous avez demande la reinitialisation de votre mot de passe sur Memoires+.</p>

    <p>
        <a href="{{ config('app.frontend_url') }}/reinitialiser-mot-de-passe/{{ $token }}?email={{ urlencode($email) }}">
            Reinitialiser mon mot de passe
        </a>
    </p>

    <p>Ce lien est valable 60 minutes. Si vous n'etes pas a l'origine de cette demande, ignorez cet email.</p>
</body>
</html>