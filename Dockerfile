# Base de Build
FROM php:8.1-fpm AS build

# Instala dependências do sistema e PHP
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    git \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

# Instala o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos necessários para instalação das dependências
COPY testes/composer.json /app/

# Instala dependências PHP
RUN composer install --no-dev --optimize-autoloader

# Copia todo o projeto (exceto arquivos ignorados no .dockerignore)
COPY . /app

# Imagem Final de Produção
FROM nginx:stable

# Instala PHP-FPM e dependências
# Instalar o repositório do PHP e adicionar as dependências necessárias
RUN apt-get update && apt-get install -y \
    gnupg \
    lsb-release \
    wget \
    ca-certificates \
    && echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/sury-php.list \
    && wget -qO - https://packages.sury.org/php/apt.gpg | apt-key add - \
    && apt-get update \
    && apt-get install -y \
    php8.1-fpm \
    php8.1-pdo-pgsql \
    php8.1-mbstring \
    php8.1-cli \
    && apt-get clean

# Garantir que a extensão openssl está habilitada no php.ini
RUN echo "extension=openssl" >> /etc/php/8.1/cli/php.ini \
    && echo "extension=openssl" >> /etc/php/8.1/fpm/php.ini

# Define o diretório de trabalho
WORKDIR /var/www/banco_interno

# Copia arquivos do build para o diretório web
COPY --from=build /app /var/www/banco_interno

# Copia a configuração do Nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf


# Define permissões apropriadas
RUN chown -R www-data:www-data /var/www/banco_interno

# Expõe a porta 80
EXPOSE 80

# Inicia o PHP-FPM e o Nginx
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
