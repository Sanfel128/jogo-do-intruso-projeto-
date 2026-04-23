let faseAtual = 0;
const fases = document.querySelectorAll(".fase");
let objetosRestantes = 0;

// Lista de todas as classes de posição que você criou no CSS
const todasPosicoes = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16"];

document.getElementById("btnIniciar").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  iniciarFase();
});

function iniciarFase() {
  // 1. Mostra a fase atual
  fases.forEach(f => f.classList.remove("ativa"));
  const faseAtiva = fases[faseAtual];
  faseAtiva.classList.add("ativa");

  // 2. Seleciona os objetos desta fase
  const objetos = faseAtiva.querySelectorAll(".obj");
  objetosRestantes = objetos.length;

  // 3. Embaralha as posições disponíveis
  // Criamos uma cópia do array e embaralhamos
  let posicoesEmbaralhadas = [...todasPosicoes].sort(() => Math.random() - 0.5);

  // 4. Atribui uma posição aleatória para cada objeto
  objetos.forEach((obj, index) => {
    // Remove qualquer classe de posição anterior que o HTML possa ter
    obj.classList.remove(...todasPosicoes);
    
    // Adiciona a nova classe sorteada
    obj.classList.add(posicoesEmbaralhadas[index]);
    
    // Garante que o objeto esteja visível (caso tenha sido escondido antes)
    obj.style.display = "block";

    // Adiciona o evento de clique (usando {once: true} para evitar bugs)
    obj.onclick = () => {
      obj.style.display = "none";
      objetosRestantes--;

      if (objetosRestantes === 0) {
        proximaFase();
      }
    };
  });
}

function proximaFase() {
  fases[faseAtual].classList.remove("ativa");
  faseAtual++;

  if (faseAtual < fases.length) {
    iniciarFase();
  } else {
    // Se acabarem as fases, mostra a tela final
    document.getElementById("final").style.display = "flex";
    
    // --- NOVA LINHA: CHAMA A EXPLOSÃO ---
    criarExplosao();
  }
}

// Função para gerar a explosão de partículas coloridas
function criarExplosao() {
  const container = document.getElementById('explosion-container');
  const quantidadeParticulas = 100; // Número de bolinhas

  for (let i = 0; i < quantidadeParticulas; i++) {
    const particula = document.createElement('div');
    particula.classList.add('particle');

    // Define direções aleatórias para a explosão (translate X e Y)
    // Usamos vh/vw para garantir que espalhe pela tela toda
    const translateX = (Math.random() - 0.5) * 200 + 'vw';
    const translateY = (Math.random() - 0.5) * 200 + 'vh';
    
    // Define um tamanho final aleatório para a partícula crescer
    const scale = Math.random() * 15 + 5; // Cresce de 5x a 20x o tamanho inicial

    // Aplica essas variáveis aleatórias como propriedades CSS
    particula.style.setProperty('--translateX', translateX);
    particula.style.setProperty('--translateY', translateY);
    particula.style.setProperty('--scale', scale);

    // Adiciona um pequeno atraso aleatório para não saírem todas grudadas
    particula.style.animationDelay = Math.random() * 0.2 + 's';

    container.appendChild(particula);

    // Remove a partícula do HTML depois que a animação acabar para não pesar
    particula.addEventListener('animationend', () => {
      particula.remove();
    });
  }
}

document.getElementById("btnVoltar").addEventListener("click", () => {
  location.reload();
});