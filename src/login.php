<?php
// Inicia a sessão
session_start();

// Inclui o arquivo de configuração do banco de dados
require_once "../config/db.php";

// Verifica se os dados do formulário foram enviados
if (isset($_POST['email']) && isset($_POST['password'])) {
    // Recebe os dados do formulário
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Cria a conexão com o banco de dados
    $conn = getDBConnection();  // Função que você deve definir em db.php

    // Consulta SQL para verificar se o usuário existe
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    // Verifica se o usuário foi encontrado
    if ($stmt->rowCount() > 0) {
        // Obtém os dados do usuário
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verifica se a senha está correta
        if (password_verify($password, $user['password'])) {
            // A senha está correta, inicia a sessão
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];  // Armazena o e-mail na sessão
            $_SESSION['nome_usuario'] = $user['name'];  // Armazena o nome do usuário na sessão

            // Redireciona para a página inicial
            header("Location: ../front/HTML/inicio.html"); // Redireciona para a página inicial (PHP)
            exit;
        } else {
            echo "Senha incorreta!";
        }
    } else {
        echo "Usuário não encontrado!";
    }
} else {
    echo "Preencha todos os campos!";
}
?>
