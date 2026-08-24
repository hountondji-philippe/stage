@extends('emails.layout')

@section('content')
    <p style="margin:0 0 4px; color:#7A7666; font-size:11px; text-transform:uppercase; letter-spacing:1px; font-family: Arial, sans-serif;">
        Accès à la consultation
    </p>
    <h2 style="margin:0 0 20px; color:#0F2474; font-size:22px; font-family: Georgia, serif;">
        Bonjour {{ $prenom }}
    </h2>

    <p style="margin:0 0 20px; color:#3A3830; font-size:14.5px; line-height:1.7;">
        Voici votre code d'accès pour consulter les mémoires publiés sur Mémoires+. Ce code est valable <strong>15 minutes</strong> et vous donnera un accès en lecture valable <strong>24 heures</strong>.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
        <tr>
            <td align="center" style="background-color:#F7F5F0; border:1px solid #D9D4C4; padding:20px;">
                <span style="font-family: 'Courier New', monospace; font-size:28px; letter-spacing:8px; color:#0F2474; font-weight:bold;">
                    {{ $code }}
                </span>
            </td>
        </tr>
    </table>

    <p style="margin:0; color:#A39F8E; font-size:12.5px; line-height:1.6;">
        Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
    </p>
@endsection