<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhatsAppClick extends Model
{
    protected $table = 'whatsapp_clicks';

    protected $fillable = ['pagina'];
}
