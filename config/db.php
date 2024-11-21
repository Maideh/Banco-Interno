<?php
// Função para conectar ao banco de dados PostgreSQL
function getDBConnection() {
    try {
        $host = 'localhost';      // Host do banco de dados
        $dbname = 'banco_interno'; // Nome do banco de dados
        $user = 'postgres';    // Seu usuário do banco
        $password = 'postgres';  // Sua senha do banco

        // Conexão com o PostgreSQL
        $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        echo "Erro na conexão: " . $e->getMessage();
        exit;
    }
}
?>