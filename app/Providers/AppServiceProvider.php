<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Forzar HTTPS en producción y cualquier entorno no-local (Cloudflare, Nginx proxy)
        if (!$this->app->isLocal()) {
            URL::forceScheme('https');
        }
    }
}
