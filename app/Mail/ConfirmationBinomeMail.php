<?php

namespace App\Mail;

use App\Models\Memoire;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmationBinomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Memoire $memoire)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation requise — dépôt de mémoire en binôme',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.confirmation-binome',
        );
    }
}