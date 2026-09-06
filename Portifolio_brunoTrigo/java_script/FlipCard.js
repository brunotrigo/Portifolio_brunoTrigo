const botoesFlip = document.querySelectorAll('.flip-button');

function virarCartao(botao) {
	const cartao = botao.closest('.cartao');
	const estaVirado = cartao.classList.toggle('virado');  //cria uma variável booleana que indica se o cartão está virado ou não
	botao.setAttribute('aria-pressed', estaVirado); //atualiza o estado do botão
}

botoesFlip.forEach((botao) => {
	botao.addEventListener('click', () => {
		virarCartao(botao);
	});
});
