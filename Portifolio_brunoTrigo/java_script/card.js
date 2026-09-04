const trilho = document.querySelector('.card-track');
const cards = document.querySelectorAll('.card');
const botaoAnterior = document.querySelector('.seta-esquerda');
const botaoProximo = document.querySelector('.seta-direita');
const areaDoCarrossel = document.querySelector('.card-viewport');

if (!trilho || !cards.length || !botaoAnterior || !botaoProximo || !areaDoCarrossel) {
  console.warn('Slider não encontrado. Verifique os seletores do HTML.');
} else {
  let indiceAtual = cards.length / 2; // Começa no meio do carrossel
  let arrastando = false;
  let posicaoInicialMouse = 0;
  let deslocamentoArraste = 0;

  function quantidadeVisivel() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 900) return 2;
    return 2;
  }

  function ultimoIndice() {
    return cards.length - 1;
  }

  function indiceScroll() {
    const metade = Math.floor(quantidadeVisivel() / 2);
    return Math.min(Math.max(indiceAtual - metade, 0), cards.length - quantidadeVisivel());
  }

  function destacarCard() {
    cards.forEach((card, index) => {
      card.classList.toggle('is-active', index === indiceAtual);
    });
  }

  function atualizarSlider() {
    const espacamento = parseFloat(getComputedStyle(trilho).gap) || 20;
    const larguraCard = cards[0].getBoundingClientRect().width + espacamento;

    indiceAtual = Math.min(Math.max(indiceAtual, 0), ultimoIndice());
    trilho.style.transform = `translateX(-${indiceScroll() * larguraCard}px)`;
    destacarCard();
  }

  function finalizarArraste() {
    if (!arrastando) return;

    arrastando = false;
    trilho.style.transition = '';

    if (deslocamentoArraste < -60) {
      indiceAtual += 1;
    } else if (deslocamentoArraste > 60) {
      indiceAtual -= 1;
    }

    if (indiceAtual > ultimoIndice()) indiceAtual = 0;
    if (indiceAtual < 0) indiceAtual = ultimoIndice();

    deslocamentoArraste = 0;
    atualizarSlider();
  }

  areaDoCarrossel.addEventListener('pointerdown', (evento) => {
    arrastando = true;
    posicaoInicialMouse = evento.clientX;
    deslocamentoArraste = 0;
    trilho.style.transition = 'none';
    areaDoCarrossel.setPointerCapture(evento.pointerId);
  });

  areaDoCarrossel.addEventListener('pointermove', (evento) => {
    if (!arrastando) return;

    const espacamento = parseFloat(getComputedStyle(trilho).gap) || 20;
    const larguraCard = cards[0].getBoundingClientRect().width + espacamento;
    deslocamentoArraste = evento.clientX - posicaoInicialMouse;

    const deslocamentoTotal = -(indiceScroll() * larguraCard) + deslocamentoArraste;
    trilho.style.transform = `translateX(${deslocamentoTotal}px)`;
  });

  areaDoCarrossel.addEventListener('pointerup', finalizarArraste);
  areaDoCarrossel.addEventListener('pointerleave', finalizarArraste);
  areaDoCarrossel.addEventListener('pointercancel', finalizarArraste);

  botaoProximo.addEventListener('click', () => {
    if (indiceAtual >= ultimoIndice()) {
      indiceAtual = 0;
    } else {
      indiceAtual += 1;
    }
    atualizarSlider();
  });

  botaoAnterior.addEventListener('click', () => {
    if (indiceAtual <= 0) {
      indiceAtual = ultimoIndice();
    } else {
      indiceAtual -= 1;
    }
    atualizarSlider();
  });

  window.addEventListener('resize', atualizarSlider);
  window.addEventListener('load', atualizarSlider);
  atualizarSlider();
}