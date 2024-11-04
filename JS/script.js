// ##########################################################################
// ##########################################################################
// ####- INICIO inicio.html -####

// Função para buscar o saldo do usuário (exemplo com fetch)
function buscarSaldo() {
    fetch('/buscar_saldo')
        .then(response => response.json())
        .then(data => {
            document.getElementById('saldo').textContent = data.saldo;
        })
        .catch(error => {
            console.error('Erro ao buscar o saldo:', error);
        });
}

// Chamar a função ao carregar a página
window.onload = buscarSaldo;

// ##########################################################################
// ##########################################################################
// ####- TRANSFERENCIAS transferencia.html -####

// Função para carregar as opções de contas do usuário
function carregarContas() {
    // Faz uma requisição ao backend para buscar as contas do usuário
    fetch('http://localhost:3000/buscar-contas')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('conta-origem');
            data.contas.forEach(conta => {
                const option = document.createElement('option');
                option.value = conta.id;
                option.text = conta.numero;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar as contas:', error);
        });
}

// Função para validar o formulário e enviar os dados para o backend
function enviarTransferencia(event) {
    event.preventDefault();
    // Validar os dados do formulário
    // Enviar os dados para o backend utilizando fetch ou outra biblioteca
}

// Chamar a função para carregar as contas ao carregar a página
window.onload = carregarContas;

// Função para ocultar todos os formulários
function ocultarFormularios() {
    const formularioTransferencia = document.getElementById('form-transferencia');
    const formularioEmprestimo = document.getElementById('form-emprestimo');
    formularioTransferencia.style.display = 'none';
    formularioEmprestimo.style.display = 'none';
}

// Função para mostrar o formulário de transferência
function mostrarFormularioTransferencia() {
    ocultarFormularios();
    document.getElementById('form-transferencia').style.display = 'block';
}

// Event listener para o formulário de transferência
const formTransferencia = document.getElementById('form-transferencia');
formTransferencia.addEventListener('submit', (event) => {
    event.preventDefault();
    // ... (lógica de envio da transferência)
});

// Chamar uma função para mostrar o formulário inicial (opcional)
mostrarFormularioTransferencia(); // Por exemplo, para mostrar o formulário de transferência por padrão

// ##########################################################################
// ##########################################################################
// ####- EXTRATO extrato.html -####
// Função para carregar as transações do usuário e preencher a tabela
function carregarTransacoes() {
    // Faz uma requisição ao backend para buscar as transações do usuário
    fetch('/buscar-transacoes')
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById('extrato-table').getElementsByTagName('tbody')[0];
            data.transacoes.forEach(transacao => {
                const novaLinha = tabela.insertRow();
                const celulaData = novaLinha.insertCell();
                const celulaDescricao = novaLinha.insertCell();
                const celulaValor = novaLinha.insertCell();
                const celulaSaldo = novaLinha.insertCell();

                celulaData.textContent = transacao.data;
                celulaDescricao.textContent = transacao.descricao;
                celulaValor.textContent = transacao.valor;
                celulaSaldo.textContent = transacao.saldo;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar as transações:', error);
        });
}

// Chamar a função para carregar as transações ao carregar a página
window.onload = carregarTransacoes;

// ##########################################################################
// ##########################################################################
// ####- CONTA conta.html -####
// Função para carregar as informações da conta do usuário
function carregarInformacoesConta() {
    // Faz uma requisição ao backend para buscar as informações da conta do usuário
    fetch('/buscar-informacoes-conta')
        .then(response => response.json())
        .then(data => {
            document.getElementById('saldo').textContent = data.saldo;
            document.getElementById('limite').textContent = data.limite;
            // Atualizar outros elementos com as informações da conta
        })
        .catch(error => {
            console.error('Erro ao carregar as informações da conta:', error);
        });
}

// Chamar a função para carregar as informações ao carregar a página
window.onload = carregarInformacoesConta;

// ##########################################################################
// ##########################################################################
// ####- EMPRESTIMOS E SIMULACAO emprestimo.html -####
// Função para mostrar o formulário de empréstimo
function mostrarFormularioEmprestimo() {
    ocultarFormularios();
    document.getElementById('form-emprestimo').style.display = 'block';
}

// Função para calcular o valor das parcelas do empréstimo
function calcularParcelaEmprestimo() {
    // ... (código de cálculo do empréstimo)
}

// Event listener para o formulário de empréstimo
const formEmprestimo = document.getElementById('form-emprestimo');
formEmprestimo.addEventListener('submit', (event) => {
    event.preventDefault();
    calcularParcelaEmprestimo();

    const valorDesejado = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);

    // Simulação simplificada (ajuste a fórmula de acordo com a sua taxa de juros e condições)
    const taxaJurosMensal = 0.01; // 1% ao mês (ajuste conforme necessário)
    const valorParcela = valorDesejado * (taxaJurosMensal * Math.pow(1 + taxaJurosMensal, prazo)) / (Math.pow(1 + taxaJurosMensal, prazo) - 1);
    const valorTotal = valorParcela * prazo;

    document.getElementById('valor-parcela').textContent = valorParcela.toFixed(2);
    document.getElementById('valor-total').textContent = valorTotal.toFixed(2);
    document.getElementById('taxa-juros').textContent = taxaJurosMensal * 100 + '%';

    resultadoSimulacao.style.display = 'block';

});

// ##########################################################################
// ##########################################################################
// ####- CARTÕES E CHAVES cartoes_chaves.html -####
// Simulando dados de cartões (substitua por uma chamada à API)
const cartoes = [
    { numero: '**** **** **** 1234', bandeira: 'Visa', validade: '12/25', limite: 1000 },
    // ... outros cartões
];

// Função para criar um elemento de cartão
function criarCartao(cartao) {
    const cartaoElement = document.createElement('div');
    cartaoElement.classList.add('cartao');
    cartaoElement.innerHTML = `
        <p>Número: ${cartao.numero}</p>
        <p>Bandeira: ${cartao.bandeira}</p>
        <p>Validade: ${cartao.validade}</p>
        <p>Limite: R$ ${cartao.limite}</p>
        <button>Editar</button>
        <button>Excluir</button>
    `;
    return cartaoElement;
}

// Função para renderizar a lista de cartões
function renderizarCartoes() {
    const listaCartoes = document.getElementById('lista-cartoes');
    listaCartoes.innerHTML = ''; // Limpa a lista antes de renderizar

    cartoes.forEach(cartao => {
        listaCartoes.appendChild(criarCartao(cartao));
    });
}

// Renderizar a lista de cartões inicialmente
renderizarCartoes();

// ... (código para adicionar, editar e excluir cartões, interagir com a API, etc.)

// ##########################################################################
// ##########################################################################
// ####- CONFIGURACOES configuracoes.html -####

// Função para salvar as configurações
function salvarConfiguracoes(event) {
    event.preventDefault();
    const form = document.getElementById('form-configuracoes');
    const dados = new FormData(form);

    // Enviar os dados para o servidor (exemplo com fetch)
    fetch('/api/configuracoes', {
        method: 'POST',
        body: dados
    })
    .then(response => response.json())
    .then(data => {
        console.log('Configurações salvas:', data);
        // Atualizar a interface com as novas configurações
    })
    .catch(error => {
        console.error('Erro ao salvar as configurações:', error);
    });
}

// Adicionar event listener ao formulário
const formConfiguracoes = document.getElementById('form-configuracoes');
formConfiguracoes.addEventListener('submit', salvarConfiguracoes);

// Carregar as configurações do usuário (exemplo com fetch)
fetch('/api/configuracoes')
    .then(response => response.json())
    .then(data => {
        // Preencher os campos do formulário com os dados do usuário
        document.getElementById('nome').value = data.nome;
        // ...
    })
    .catch(error => {
        console.error('Erro ao carregar as configurações:', error);
    });

// ##########################################################################
// ##########################################################################
// ####- SUPORTE suporte.html -####

// Funcionalidade para o chat ao vivo (simplificado)
const chatInput = document.getElementById('mensagem');
const chatMessages = document.getElementById('mensagens');

chatInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const mensagem = chatInput.value;
        chatMessages.innerHTML += `<div>Você: ${mensagem}</div>`;
        chatInput.value = '';

        // Enviar a mensagem para o servidor (exemplo com fetch)
        fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ mensagem })
        })
        .then(response => response.json())
        .then(data => {
            chatMessages.innerHTML += `<div>Bot: ${data.resposta}</div>`;
        })
        .catch(error => {
            console.error('Erro ao enviar a mensagem:', error);
        });
    }
});

// ##########################################################################
// ##########################################################################
// ####- SOBRE sobre.html -####
const btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', () => {
    // Aqui você pode implementar a lógica para redirecionar o usuário para a página de login
    // Por exemplo, usando JavaScript puro ou uma biblioteca como React Router
    window.location.href = '../HTML/login.html';
});

// ##########################################################################
// ##########################################################################
// ####- RECUPERAR recuperar_senha.html -####

const form = document.getElementById('form-recuperar-senha');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;

    // Simulação de envio de email para resetar a senha (substituir por uma chamada para sua API)
    fetch('/api/recuperar-senha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (response.ok) {
            mensagem.textContent = 'Um email foi enviado para você com instruções para resetar sua senha.';
        } else {
            mensagem.textContent = 'Houve um erro ao enviar o email.';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        mensagem.textContent = 'Ocorreu um erro inesperado.';
    });
});