#!/bin/sh
php artisan config:clear
php artisan config:cache
php artisan migrate --force
php artisan db:seed --force
php artisan queue:work --tries=3 --timeout=90 &
php artisan serve --host 0.0.0.0 --port ${PORT:-10000}