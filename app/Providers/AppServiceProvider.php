<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Mail\Transport\BrevoApiTransport;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Middleware\Authenticate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') !== 'local') {
            URL::forceScheme('https');
        }

        Mail::extend('brevo', function () {
            return new BrevoApiTransport(config('services.brevo.key'));
        });

        Authenticate::redirectUsing(fn () => null);
    }
}