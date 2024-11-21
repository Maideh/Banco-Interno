<?php
// Configuração de conexão
$host = 'localhost'; // ou o IP do servidor PostgreSQL, se não estiver na mesma máquina
$port = '5432';      // A porta padrão do PostgreSQL
$dbname = 'seu_banco'; // Nome do seu banco de dados
$user = 'seu_usuario'; // Nome do usuário do banco
$password = 'sua_senha'; // A senha do usuário

require_once __DIR__ . '/lib/vendor/autoload.php';
echo 'PHPMailer instalado com sucesso!';

try {
    // Criação da conexão PDO
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    
    // Definindo o modo de erro do PDO para exceções
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Conexão bem-sucedida com o PostgreSQL!";
} catch (PDOException $e) {
    // Caso haja erro na conexão
    echo "Erro ao conectar ao PostgreSQL: " . $e->getMessage();
}
?>
