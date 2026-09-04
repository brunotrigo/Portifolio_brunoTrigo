const trilho = document.querySelector('.card-track');
const cards = document.querySelectorAll('.card');
const botaoAnterior = document.querySelector('.seta-esquerda');
const botaoProximo = document.querySelector('.seta-direita');
const areaDoCarrossel = document.querySelector('.card-viewport');

if (!trilho || !cards.length || !botaoAnterior || !botaoProximo || !areaDoCarrossel) {
  console.warn('Slider não encontrado. Verifique os seletores do HTML.');
} else {
  let indiceAtual = 0;
  let arrastando = false;
  let posicaoInicialMouse = 0;
  let deslocamentoArraste = 0;

  function quantidadeVisivel() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function maiorIndice() {
    return Math.max(cards.length - quantidadeVisivel(), 0);
  }

  function indiceDoCardCentral() {
    const metade = Math.floor(quantidadeVisivel() / 2);
    return Math.min(indiceAtual + metade, cards.length - 1);
  }

  function atualizarEstadoDosCards() {
    const indiceCentral = indiceDoCardCentral();

    cards.forEach((card, index) => {
      const cardEmDestaque = index === indiceCentral;
      card.classList.toggle('is-active', cardEmDestaque);
    });
  }

  function atualizarSlider() {
    const espacamento = parseFloat(getComputedStyle(trilho).gap) || 20;
    const larguraCard = cards[0].getBoundingClientRect().width + espacamento;

    indiceAtual = Math.min(Math.max(indiceAtual, 0), maiorIndice());
    trilho.style.transform = `translateX(-${indiceAtual * larguraCard}px)`;
    atualizarEstadoDosCards();
  }

  function finalizarArraste() {
    if (!arrastando) return;

    arrastando = false;

    if (deslocamentoArraste < -60) {
      indiceAtual += 1;
    } else if (deslocamentoArraste > 60) {
      indiceAtual -= 1;
    }

    deslocamentoArraste = 0;
    atualizarSlider();
  }

  areaDoCarrossel.addEventListener('pointerdown', (evento) => {
    arrastando = true;
    posicaoInicialMouse = evento.clientX;
    deslocamentoArraste = 0;
  });

  areaDoCarrossel.addEventListener('pointermove', (evento) => {
    if (!arrastando) return;

    const espacamento = parseFloat(getComputedStyle(trilho).gap) || 20;
    const larguraCard = cards[0].getBoundingClientRect().width + espacamento;
    deslocamentoArraste = evento.clientX - posicaoInicialMouse;

    const deslocamentoTotal = -(indiceAtual * larguraCard) + deslocamentoArraste;
    trilho.style.transform = `translateX(${deslocamentoTotal}px)`;
  });

  areaDoCarrossel.addEventListener('pointerup', finalizarArraste);
  areaDoCarrossel.addEventListener('pointerleave', finalizarArraste);
  areaDoCarrossel.addEventListener('pointercancel', finalizarArraste);

  botaoProximo.addEventListener('click', () => {
    if (indiceAtual >= maiorIndice()) {
      indiceAtual = 0;
    } else {
      indiceAtual += 1;
    }
    atualizarSlider();
  });

  botaoAnterior.addEventListener('click', () => {
    if (indiceAtual <= 0) {
      indiceAtual = maiorIndice();
    } else {
      indiceAtual -= 1;
    }
    atualizarSlider();
  });

  window.addEventListener('resize', atualizarSlider);
  window.addEventListener('load', atualizarSlider);
  atualizarSlider();
}