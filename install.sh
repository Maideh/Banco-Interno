#!/bin/bash

# Atualiza os pacotes do sistema
sudo apt-get update

# Instala PHP e extensões necessárias
sudo apt-get install -y php php-cli php-pdo php-pgsql php-mbstring php-openssl

# Instala o Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Instala PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Configura o banco de dados
psql -U postgres -f database/commands.sql  # Supondo que você tenha o arquivo SQL

# Instala dependências do PHP via Composer
composer install

# Instala npm (caso precise para frontend)
sudo apt-get install -y npm
npm install  # Caso tenha um package.json

echo "Instalação concluída!"