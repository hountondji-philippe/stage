<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding: 40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background-color:#111827; padding:28px 32px; text-align:center;">
                            <span style="color:#ffffff; font-size:22px; font-weight:bold; letter-spacing:0.5px;">
                                Mémoires<span style="color:#3b82f6;">+</span>
                            </span>
                        </td>
                    </tr>

                    <!-- Bande d'accent -->
                    <tr>
                        <td style="height:4px; background-color:#3b82f6;"></td>
                    </tr>

                    <!-- Corps -->
                    <tr>
                        <td style="padding:36px 32px;">
                            <h2 style="margin:0 0 20px; color:#111827; font-size:21px;">
                                Activation de votre compte
                            </h2>

                            <p style="margin:0 0 16px; color:#374151; font-size:15px; line-height:1.6;">
                                Bonjour <strong>{{ $etudiantAutorise->prenom }}</strong>,
                            </p>

                            <p style="margin:0 0 28px; color:#374151; font-size:15px; line-height:1.6;">
                                Vous pouvez activer votre compte étudiant en cliquant sur le bouton ci-dessous.
                                Ce lien est valable <strong>48 heures</strong>.
                            </p>

                            <!-- Bouton -->
                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                                <tr>
                                    <td style="border-radius:8px; background-color:#3b82f6;">
                                        <a href="{{ config('app.frontend_url') }}/activation/{{ $etudiantAutorise->token_activation }}"
                                           style="display:inline-block; padding:14px 32px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold; border-radius:8px;">
                                            Activer mon compte
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:32px 0 0; color:#9ca3af; font-size:13px; line-height:1.5;">
                                Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email —
                                aucune action ne sera effectuée sur votre compte.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f9fafb; padding:18px 32px; text-align:center; border-top:1px solid #e5e7eb;">
                            <p style="margin:0; color:#9ca3af; font-size:12px;">
                                &copy; {{ date('Y') }} Mémoires+ — IFRI / ENEAM
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>