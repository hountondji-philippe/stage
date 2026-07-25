<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CodeAccesL2Mail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $prenom, public string $code)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre code d\'accès Mémoires+',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.code-acces-l2',
        );
    }
}