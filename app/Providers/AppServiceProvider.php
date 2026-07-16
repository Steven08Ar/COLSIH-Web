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
        if (config('app.env') === 'production') {
            $root = str_replace('http://', 'https://', config('app.url'));
            URL::forceRootUrl($root);
            URL::forceScheme('https');
        }
    }
}
