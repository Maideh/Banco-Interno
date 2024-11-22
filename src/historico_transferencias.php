<?php
// Conectar ao banco de dados PostgreSQL
$host = "localhost";       // Endereço do servidor
$port = "5432";            // Porta do PostgreSQL
$dbname = "banco_interno"; // Nome do banco de dados
$user = "postgres";     // Seu usuário do PostgreSQL
$password = "postgres";   // Sua senha do PostgreSQL

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Conexão falhou: " . pg_last_error());
}

// Função para registrar a transferência no banco
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $valor = $_POST['valor'];
    $tipo_transferencia = $_POST['tipo_transferencia'];
    $usuario_id = 1;  // Substitua com o ID do usuário logado, se houver

    $query = "INSERT INTO transferencias (valor, tipo_transferencia, usuario_id) 
              VALUES ($1, $2, $3)";
    $result = pg_query_params($conn, $query, array($valor, $tipo_transferencia, $usuario_id));

    if ($result) {
        echo "Transferência registrada com sucesso!";
    } else {
        echo "Erro: " . pg_last_error($conn);
    }
}

// Exibir o histórico de transferências
$query = "SELECT valor, tipo_transferencia, data_transferencia FROM transferencias WHERE usuario_id = 1";  // Substitua com o ID do usuário logado, se necessário
$result = pg_query($conn, $query);

echo "<h2>Histórico de Transferências</h2>";
echo "<table>";
echo "<tr><th>Valor</th><th>Tipo de Transferência</th><th>Data</th></tr>";

if (pg_num_rows($result) > 0) {
    while ($row = pg_fetch_assoc($result)) {
        echo "<tr><td>R$ " . number_format($row['valor'], 2, ',', '.') . "</td><td>" . $row['tipo_transferencia'] . "</td><td>" . $row['data_transferencia'] . "</td></tr>";
    }
    echo "</table>";
} else {
    echo "Nenhuma transferência registrada.";
}

pg_close($conn);
?>
