<?php
namespace App\Mail;
use App\Models\Memoire;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
class FicheDepotMail extends Mailable
{
    use Queueable, SerializesModels;
    public function __construct(public Memoire $memoire, public string $prenomDestinataire)
    {
    }
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation de dépôt —' . $this->memoire->titre,
        );
    }
    public function content(): Content
    {
        return new Content(
            view: 'emails.fiche-depot',
        );
    }
    public function attachments(): array
    {
        if (!$this->memoire->fichier_preuve) {
            return [];
        }
        return [
            Attachment::fromStorageDisk('s3', $this->memoire->fichier_preuve)
                ->as('fiche-depot.pdf')
                ->withMime('application/pdf'),
        ];
    }
}