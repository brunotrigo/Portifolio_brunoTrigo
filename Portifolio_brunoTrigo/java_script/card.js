const track = document.querySelector('.card-track');
const cards = Array.from(document.querySelectorAll('.card'));
const prevButton = document.querySelector('.seta-esquerda');
const nextButton = document.querySelector('.seta-direita');

if (!track || !cards.length || !prevButton || !nextButton) {
  console.warn('Carrossel não encontrado. Verifique os seletores do HTML.');
} else {
  let currentIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(cards.length - getVisibleCards(), 0);
  }

  function updateSlider() {
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const cardWidth = cards[0].getBoundingClientRect().width + gap;

    currentIndex = Math.min(currentIndex, getMaxIndex());
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function goToNext() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function goToPrevious() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  }

  nextButton.addEventListener('click', goToNext);
  prevButton.addEventListener('click', goToPrevious);
  window.addEventListener('resize', updateSlider);
  window.addEventListener('load', updateSlider);

  updateSlider();
}