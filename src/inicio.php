<?php
// // Inicia a sessão
// session_start();
// include('../front/HTML/inicio.html');


// // Verifica se o usuário está logado
// if (!isset($_SESSION['nome_usuario'])) {
//     // Redireciona para a página de login caso o usuário não esteja logado
//     header("Location: login.php");
//     exit;
// }

// // Define o nome do usuário
// $nomeUsuario = htmlspecialchars($_SESSION['nome_usuario']);

// // Carrega o conteúdo do arquivo HTML
// $html = file_get_contents("../front/HTML/inicio.html");

// // Insere o nome do usuário no atributo `data-username` do body
// $html = str_replace('data-username=""', 'data-username="' . $nomeUsuario . '"', $html);

// // Exibe o HTML atualizado
// echo $html;
?>
