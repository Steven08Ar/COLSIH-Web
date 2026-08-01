<?php

namespace App\Mail;

use App\Models\MensajeContacto;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactoRecibido extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public MensajeContacto $mensaje) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nuevo mensaje de contacto: ' . $this->mensaje->asunto,
            replyTo: [new \Illuminate\Mail\Mailables\Address($this->mensaje->email, $this->mensaje->nombre)],
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.contacto_recibido');
    }
}
