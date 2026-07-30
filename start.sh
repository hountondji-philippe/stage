#!/bin/sh
php artisan config:clear
php artisan config:cache
php artisan migrate --force

(
  while true; do
    php artisan queue:work --tries=3 --timeout=90 --sleep=3
    echo "queue:work s'est arrêté, redémarrage dans 2 secondes..."
    sleep 2
  done
) &

php artisan serve --host 0.0.0.0 --port ${PORT:-10000}