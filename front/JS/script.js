// document.addEventListener("DOMContentLoaded", () => {
//     // Obtém o nome do usuário do atributo data-username do body
//     const userName = document.body.getAttribute("data-username");

//     // Atualiza o texto com o nome do usuário
//     document.getElementById("nomeUsuario").textContent = userName;
// });

let saldoCorrente = 1000; // Exemplo de saldo inicial
let saldoPoupanca = 500; // Exemplo de saldo inicial

// Esperar o DOM ser completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente carregado.");

    // Verificar se os elementos de saldo existem
    const saldoCorrenteElement = document.getElementById("saldo_corrente");
    const saldoPoupancaElement = document.getElementById("saldo_poupanca");
    const valorEmprestimoInput = document.getElementById("valor_emprestimo");
    const realizarEmprestimoButton = document.getElementById("realizar_emprestimo");
    const valorTransferenciaInput = document.getElementById("valor_transferencia");
    const paraPoupancaButton = document.getElementById("para_poupanca");
    const paraCorrenteButton = document.getElementById("para_corrente");

    // Log para verificar se os elementos foram encontrados
    if (!saldoCorrenteElement || !saldoPoupancaElement) {
        console.error("Os elementos de saldo não foram encontrados no HTML.");
    } else {
        console.log("Elementos de saldo encontrados.");
    }

    // Verificar se os elementos estão presentes no DOM antes de manipular
    if (saldoCorrenteElement && saldoPoupancaElement) {
        // Atualizar os saldos na tela, se os elementos existirem
        atualizarSaldos();

        // Função de Empréstimo
        if (realizarEmprestimoButton) {
            realizarEmprestimoButton.addEventListener("click", function () {
                const valor = parseFloat(valorEmprestimoInput.value);
                if (isNaN(valor) || valor <= 0) {
                    alert("Por favor, insira um valor válido.");
                    return;
                }
                saldoCorrente += valor;
                saldoCorrenteElement.textContent = `R$ ${saldoCorrente.toFixed(2)}`;
                valorEmprestimoInput.value = "";
                alert("Empréstimo realizado com sucesso!");
            });
        }

        // Função para Transferir para Poupança
        if (paraPoupancaButton && valorTransferenciaInput) {
            paraPoupancaButton.addEventListener("click", function () {
                const valor = parseFloat(valorTransferenciaInput.value);
                if (isNaN(valor) || valor <= 0) {
                    alert("Por favor, insira um valor válido.");
                    return;
                }
                if (valor > saldoCorrente) {
                    alert("Saldo insuficiente na Conta Corrente.");
                    return;
                }
                saldoCorrente -= valor;
                saldoPoupanca += valor;
                atualizarSaldos();
                alert("Transferência para Poupança realizada com sucesso!");
            });
        }

        // Função para Transferir para Conta Corrente
        if (paraCorrenteButton) {
            paraCorrenteButton.addEventListener("click", function () {
                const valor = parseFloat(valorTransferenciaInput.value);
                if (isNaN(valor) || valor <= 0) {
                    alert("Por favor, insira um valor válido.");
                    return;
                }
                if (valor > saldoPoupanca) {
                    alert("Saldo insuficiente na Poupança.");
                    return;
                }
                saldoPoupanca -= valor;
                saldoCorrente += valor;
                atualizarSaldos();
                alert("Transferência para Conta Corrente realizada com sucesso!");
            });
        }
    }
});

// Função para atualizar os saldos na tela
function atualizarSaldos() {
    const saldoCorrenteElement = document.getElementById("saldo_corrente");
    const saldoPoupancaElement = document.getElementById("saldo_poupanca");

    if (saldoCorrenteElement) {
        saldoCorrenteElement.textContent = `R$ ${saldoCorrente.toFixed(2)}`;
    }

    if (saldoPoupancaElement) {
        saldoPoupancaElement.textContent = `R$ ${saldoPoupanca.toFixed(2)}`;
    }
}

// Função para alternar entre o modo noturno e diurno
function toggleMode() {
    document.body.classList.toggle("dark-mode");
    const buttons = document.querySelectorAll('.mode-toggle');

    // Troca o texto dos botões entre "Noite" e "Dia"
    buttons.forEach(button => {
        if (document.body.classList.contains('dark-mode')) {
            button.textContent = "Dia";
        } else {
            button.textContent = "Noite";
        }
    });
}
