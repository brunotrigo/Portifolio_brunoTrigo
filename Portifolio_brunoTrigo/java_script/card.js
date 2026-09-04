const trilho = document.querySelector('.card-track');
const cards = document.querySelectorAll('.card');
const botaoAnterior = document.querySelector('.seta-esquerda');
const botaoProximo = document.querySelector('.seta-direita');

if (!trilho || !cards.length || !botaoAnterior || !botaoProximo) {
  console.warn('Slider não encontrado. Verifique os seletores do HTML.');
} else {
  let indiceAtual = 0;

  function quantidadeVisivel() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function maiorIndice() {
    return Math.max(cards.length - quantidadeVisivel(), 0);
  }

  function atualizarSlider() {
    const espacamento = parseFloat(getComputedStyle(trilho).gap) || 20;
    const larguraCard = cards[0].getBoundingClientRect().width + espacamento;

    indiceAtual = Math.min(indiceAtual, maiorIndice());
    trilho.style.transform = `translateX(-${indiceAtual * larguraCard}px)`;
  }

  botaoProximo.addEventListener('click', () => {
    if (indiceAtual >= maiorIndice()) {
      indiceAtual = 0;
    } else {
      indiceAtual = indiceAtual + 1;
    }
    atualizarSlider();
  });

  botaoAnterior.addEventListener('click', () => {
    if (indiceAtual <= 0){
      indiceAtual = maiorIndice();
    }else{
      indiceAtual = indiceAtual - 1;
    }
    atualizarSlider();
  });

  window.addEventListener('resize', atualizarSlider);
  window.addEventListener('load', atualizarSlider);
  atualizarSlider();
}