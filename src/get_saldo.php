<?php
// // Conectar ao banco de dados PostgreSQL
// $host = 'localhost'; // Seu host
// $dbname = 'banco_interno'; // Nome do banco de dados
// $user = 'postgres'; // Usuário do banco de dados
// $password = 'postgres'; // Senha do banco de dados

// // Conexão com o PostgreSQL usando pg_connect
// $conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

// if (!$conn) {
//     die("Conexão falhou: " . pg_last_error());
// }

// // ID do usuário, você pode pegar isso de uma sessão ou de outra forma
// $usuario_id = 1; // Exemplo de ID de usuário

// // Consulta para obter o saldo
// $sql = "SELECT saldo_conta_corrente FROM public.users WHERE id = $usuario_id";
// $result = pg_query($conn, $sql);

// if ($result) {
//     $row = pg_fetch_assoc($result);
//     echo "R$ " . number_format($row['saldo_conta_corrente'], 2, ',', '.');
// } else {
//     echo "Saldo não encontrado";
// }

// pg_close($conn); // Fechar a conexão com o banco de dados
?>
