<?php
// Inicia a sessão
session_start();

// Inclui o arquivo de configuração do banco de dados
require_once "../config/db.php";

// Verifica se os dados do formulário foram enviados
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['confirm_password'])) {
    // Recebe os dados do formulário
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Verifica se a senha e a confirmação de senha são iguais
    if ($password !== $confirm_password) {
        echo "As senhas não coincidem!";
        exit;
    }

    // Cria a conexão com o banco de dados
    $conn = getDBConnection();  // Função que você deve definir em db.php

    // Verifica se o email já existe no banco de dados
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Se o email já existir
        echo "Este email já está cadastrado!";
    } else {
        // Se o email não existir, cria um novo usuário
        // Cria o hash da senha
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insere os dados do novo usuário no banco de dados
        $sql = "INSERT INTO users (email, password, name) VALUES (:email, :password, :name)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':name', $name);

        // Executa a inserção
        if ($stmt->execute()) {
            echo "Usuário cadastrado com sucesso!";
            // Redireciona para a página de login
            header("Location: ../front/HTML/login.html");
            exit;
        } else {
            echo "Erro ao cadastrar o usuário. Tente novamente.";
        }
    }
} else {
    echo "Preencha todos os campos!";
}
?>