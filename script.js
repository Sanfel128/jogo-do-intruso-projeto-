const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-f1');
const telaFinal = document.getElementById('tela-final');
const btnIniciar = document.getElementById('b-iniciar');
const btnVoltar = document.getElementById('b-voltar');

// Iniciar o jogo na Fase 1.
btnIniciar.onclick = () => {
    telaInicial.style.display = 'none';
    telaJogo.style.display = 'block';
    carregarFasePraia();
};

// --- FASE 1: PRAIA ---
function carregarFasePraia() {
    telaJogo.innerHTML = '<h2>Fase 1: O que não pertence à Praia?</h2>';
    
    const container = document.createElement('div');
    container.className = 'cenario-container';
    container.style.backgroundColor = "#fce38a"; // Cor de areia
    // container.style.backgroundImage = "url('praia.jpg')"; // Quando tiver a imagem, use esta linha
    telaJogo.appendChild(container);

    const normais = ['🐚', '🏖️', '🦀', '⛱️'];
    const intruso = '💻'; // Notebook não pertence à praia

    // Gerar itens normais
    for (let i = 0; i < 10; i++) {
        const item = normais[Math.floor(Math.random() * normais.length)];
        criarElemento(item, container, false, "Isso pertence à praia!");
    }

    // Gerar o intruso da praia
    criarElemento(intruso, container, true, "Boa! Um notebook na areia estragaria!", carregarFaseSala);
}

// --- FASE 2: SALA DE ESTAR ---
function carregarFaseSala() {
    telaJogo.innerHTML = '<h2>Fase 2: O que não pertence à Sala?</h2>';
    
    const container = document.createElement('div');
    container.className = 'cenario-container';
    container.style.backgroundColor = "#a8e6cf"; // Cor de parede de sala
    telaJogo.appendChild(container);

    const moveis = ['🛋️', '📺', '📚', '🖼️', '☕'];
    const intruso = '⚓'; // Uma âncora de navio não pertence à sala

    // Gerar móveis
    moveis.forEach(movel => {
        criarElemento(movel, container, false, "Isso é um móvel da sala.");
    });

    // Gerar o intruso da sala
    criarElemento(intruso, container, true, "Exato! Uma âncora no meio da sala?", finalizarJogo);
}

// --- FUNÇÕES AUXILIARES ---

function criarElemento(simbolo, pai, ehIntruso, mensagem, acaoSucesso) {
    const el = document.createElement('span');
    el.innerHTML = simbolo;
    el.className = 'objeto';
    el.style.left = Math.random() * 540 + 'px';
    el.style.top = Math.random() * 340 + 'px';

    el.onclick = () => {
        if (ehIntruso) {
            alert(mensagem);
            acaoSucesso();
        } else {
            alert(mensagem);
        }
    };
    pai.appendChild(el);
}

function finalizarJogo() {
    telaJogo.style.display = 'none';
    telaFinal.style.display = 'block';
}

btnVoltar.onclick = () => location.reload();