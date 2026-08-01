<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SuscripcionConfirmada extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $correo) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: '¡Te suscribiste al boletín de COLSIH!');
    }

    public function content(): Content
    {
        return new Content(view: 'emails.suscripcion_confirmada');
    }
}
