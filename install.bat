:: Atualiza os pacotes do sistema (se necessário)

:: Instala o PHP
choco install php --version 8.4.1

:: Instala Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
move composer.phar C:\bin\composer.phar

:: Instala o PostgreSQL
choco install postgresql

:: Configura o banco de dados
psql -U postgres -f database\commands.sql

:: Instala dependências do PHP via Composer
composer install

echo Instalação concluída!