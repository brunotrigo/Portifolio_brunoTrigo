const track = document.querySelector('.card-track');
const cards = Array.from(document.querySelectorAll('.card'));
const prevBtn = document.querySelector('.seta-esquerda');
const nextBtn = document.querySelector('.seta-direita');

if (!track || !cards.length || !prevBtn || !nextBtn) {
  console.warn('Slider não encontrado. Verifique os seletores do HTML.');
} else {
  let index = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function updateSlider() {
    const visibleCards = getVisibleCards();
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const cardWidth = cards[0].getBoundingClientRect().width + gap;
    const maxIndex = Math.max(cards.length - visibleCards, 0);

    index = Math.min(index, maxIndex);
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(cards.length - visibleCards, 0);

    index = index >= maxIndex ? 0 : index + 1;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(cards.length - visibleCards, 0);

    index = index <= 0 ? maxIndex : index - 1;
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);
  window.addEventListener('load', updateSlider);
  updateSlider();
}