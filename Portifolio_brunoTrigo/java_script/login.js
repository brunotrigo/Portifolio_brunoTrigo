const formularioLogin = document.querySelector('#form-login');
const campoLogin = document.querySelector('#login');
const campoSenha = document.querySelector('#senha');
const mensagemErroLogin = document.querySelector('#erro-login');

formularioLogin.addEventListener('submit', (evento) => {
	evento.preventDefault();
	mensagemErroLogin.textContent = '';

	const login = campoLogin.value.trim().toLowerCase();
	const senha = campoSenha.value;

	if (!login || !senha) {
		mensagemErroLogin.textContent = 'Preencha o login e a senha.';
		return;
	}

	const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
	const usuario = usuarios.find((item) =>
		(item.email === login || item.usuario === login || item.nome.toLowerCase() === login) && item.senha === senha
	);

	if (!usuario) {
		mensagemErroLogin.textContent = 'Login ou senha inválidos.';
		return;
	}

	localStorage.setItem('usuarioLogado', JSON.stringify({
		nome: usuario.nome,
		email: usuario.email,
	}));
	window.location.href = '../index.html';
});
