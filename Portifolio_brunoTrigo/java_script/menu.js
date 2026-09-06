const botaoMenu = document.querySelector('.botao-menu');
const menu = document.querySelector('.menu');
const linksDoMenu = document.querySelectorAll('.menu a');

function alternarMenu() {
  const menuAberto = menu.classList.toggle('aberto');// menuaberto recebe True e ADICIONA 'aberto' ou REMOVE se ja tiver

  botaoMenu.classList.toggle('aberto', menuAberto); // adiona aberto se menuAberto for True e remove se for False
  botaoMenu.setAttribute('aria-expanded', menuAberto); //menu aberto aparece como condição 
  botaoMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu'); 
}

botaoMenu.addEventListener('click', alternarMenu);

linksDoMenu.forEach((link) => { // remove as classes 'aberto' do menu e do botão quando um link é clicado
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botaoMenu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
  });
});
