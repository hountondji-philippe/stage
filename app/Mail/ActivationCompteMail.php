<?php

namespace App\Mail;

use App\Models\EtudiantAutorise;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ActivationCompteMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public EtudiantAutorise $etudiantAutorise)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Activez votre compte Mémoires+',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.activation-compte',
        );
    }
}