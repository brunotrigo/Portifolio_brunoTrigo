const trilho = document.querySelector('.trilho-cartoes');
const cards = document.querySelectorAll('.cartao');
const botaoAnterior = document.querySelector('.seta-anterior');
const botaoProximo = document.querySelector('.seta-proxima');
const areaDoCarrossel = document.querySelector('.area-cartoes');

if (!trilho || !cards.length || !botaoAnterior || !botaoProximo || !areaDoCarrossel) {
  console.warn('Slider não encontrado. Verifique os seletores do HTML.');
} else {
  let indiceAtual = 0;

  function ultimoIndice() {
    return cards.length - 1;
  }


  function destacarCard() {
    cards.forEach((card, index) => {
      card.classList.toggle('ativo', index === indiceAtual);
    });
  }

  function deslocamentoCentral() {
    const cardAtual = cards[indiceAtual];
    const ultimoCard = cards[cards.length - 1];
    const larguraArea = areaDoCarrossel.clientWidth;
    const larguraCard = cardAtual.offsetWidth;
    const gap = parseFloat(getComputedStyle(trilho).gap) || 0;
    const maiorDeslocamento = ultimoCard.offsetLeft + ultimoCard.offsetWidth - larguraArea;
    const deslocamento = cardAtual.offsetLeft - (larguraArea - larguraCard) / 2;

    return Math.min(Math.max(deslocamento, 0), maiorDeslocamento+ gap);
  }

  function atualizarSlider(semAnimacao = false) {
    indiceAtual = Math.min(Math.max(indiceAtual, 0), ultimoIndice());

    if (semAnimacao) {
      trilho.classList.add('sem-animacao');
    }

    trilho.style.transform = `translateX(-${deslocamentoCentral()}px)`;
    destacarCard();

    if (semAnimacao) {
      requestAnimationFrame(() => {
        trilho.classList.remove('sem-animacao');
      });
    }
  }

  botaoProximo.addEventListener('click', () => {
    const voltouParaOInicio = indiceAtual >= ultimoIndice();

    if (indiceAtual >= ultimoIndice()) {
      indiceAtual = 0;
    } else {
      indiceAtual += 1;
    }
    atualizarSlider(voltouParaOInicio);
  });

  botaoAnterior.addEventListener('click', () => {
    const foiParaOUltimo = indiceAtual <= 0;

    if (indiceAtual <= 0) {
      indiceAtual = ultimoIndice();
    } else {
      indiceAtual -= 1;
    }
    atualizarSlider(foiParaOUltimo);
  });

  window.addEventListener('resize', atualizarSlider);
  window.addEventListener('load', atualizarSlider);
  atualizarSlider();
}