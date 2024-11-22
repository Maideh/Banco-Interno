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

// // Pegando os dados do formulário (Transferência)
// $valor = $_POST['valor'];
// $tipo_transferencia = $_POST['tipo_transferencia'];

// // ID do usuário, você pode pegar isso de uma sessão ou de outra forma
// $usuario_id = 1; // Exemplo de ID de usuário

// // Se a transferência for para a poupança, subtrai do saldo
// if ($tipo_transferencia == 'para_poupanca') {
//     $sql = "UPDATE public.users SET saldo_conta_corrente = saldo_conta_corrente - $valor WHERE id = $usuario_id";
// } else if ($tipo_transferencia == 'para_corrente') {
//     $sql = "UPDATE public.users SET saldo_conta_corrente = saldo_conta_corrente + $valor WHERE id = $usuario_id";
// } else {
//     echo "Tipo de transferência inválido";
//     exit;
// }

// // Executa a atualização do saldo
// $result = pg_query($conn, $sql);
// if ($result) {
//     echo "Saldo atualizado com sucesso!";
// } else {
//     echo "Erro ao atualizar saldo: " . pg_last_error($conn);
// }

// pg_close($conn); // Fechar a conexão com o banco de dados
?>
