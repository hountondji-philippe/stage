<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#EDEAE0; font-family: Georgia, 'Times New Roman', serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EDEAE0; padding: 48px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background-color:#FBFAF6; border:1px solid #D9D4C4;">

                    <!-- En-tête -->
                    <tr>
                        <td style="padding:32px 40px 24px; background:#001369; background:linear-gradient(135deg, #001369 0%, #2545C1 100%);">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="font-family: Georgia, serif; color:#FFFFFF; font-size:20px; font-weight:bold;">
                                        Mémoires<span style="color:#D9A62E;">+</span>
                                    </td>
                                    <td align="right" style="font-family: Arial, sans-serif; color:#D9A62E; font-size:11px; letter-spacing:1px; text-transform:uppercase;">
                                        ENEAM
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Corps -->
                    <tr>
                        <td style="padding:36px 40px; font-family: Arial, Helvetica, sans-serif;">
                            @yield('content')
                        </td>
                    </tr>

                    <!-- Pied de page -->
                    <tr>
                        <td style="background-color:#EDEAE0; padding:20px 40px; text-align:center; border-top:1px solid #D9D4C4;">
                            <p style="margin:0; color:#7A7666; font-size:12px; font-family: Arial, sans-serif;">
                                &copy; {{ date('Y') }} Mémoires+ — École Nationale d'Économie Appliquée et de Management
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>