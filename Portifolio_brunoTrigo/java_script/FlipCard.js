const cartoes = document.querySelectorAll('.cartao');

function virarCartao(cartao) {
	const estaVirado = cartao.classList.toggle('virado');  //cria uma variável booleana que indica se o cartão está virado ou não
	cartao.setAttribute('aria-pressed', estaVirado); //atualiza o atributo aria-pressed para refletir o estado do cartão
}

cartoes.forEach((cartao) => {
	cartao.addEventListener('click', () => {
		virarCartao(cartao);
	});

	cartao.addEventListener('keydown', (evento) => {
		if (evento.key === 'Enter' || evento.key === ' ') {
			evento.preventDefault();
			virarCartao(cartao);
		}
	});
});
