FROM php:8.2-cli

# Dépendances système + extensions PHP nécessaires à Laravel + PostgreSQL
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copier les fichiers de dépendances d'abord (cache Docker)
COPY composer.json composer.lock ./
RUN composer install --optimize-autoloader --no-dev --no-scripts --no-interaction

# Copier le reste du code
COPY . .

RUN composer dump-autoload --optimize

# Render fournit $PORT dynamiquement
EXPOSE 10000

CMD php artisan config:cache && php artisan migrate --force && php artisan serve --host 0.0.0.0 --port ${PORT:-10000}