const formularioCadastro = document.querySelector('#form-cadastro');
const campoNome = document.querySelector('#nome');
const campoEmail = document.querySelector('#email');
const campoDataNascimento = document.querySelector('#data-nascimento');
const campoUsuario = document.querySelector('#usuario');
const campoSenha = document.querySelector('#senha');
const campoConfirmarSenha = document.querySelector('#confirmar-senha');
const mensagemErroCadastro = document.querySelector('#erro-cadastro');
const mensagemSucessoCadastro = document.querySelector('#sucesso-cadastro');

function obterUsuarios(){
    try {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    } catch (erro) {
        return [];
    }
}

function mostrarErroCadastro(mensagem){
    mensagemErroCadastro.textContent = mensagem;
    mensagemSucessoCadastro.textContent = '';

}

formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const dataNascimento = campoDataNascimento.value;
    const usuario = campoUsuario.value.trim().toLowerCase();
    const senha = campoSenha.value;
    const confirmarSenha = campoConfirmarSenha.value;

    if (!nome || !email || !dataNascimento || !usuario || !senha || !confirmarSenha) {
        mostrarErroCadastro('Preencha todos os campos.');
        return;
    }

    if (!campoEmail.validity.valid){
        mostrarErroCadastro('digite o email corretamente');
        return;
    }
     
    const dataInformada = new Date(`${dataNascimento}T00:00:00`); 
    if (Number.isNaN(dataInformada.getTime()) || dataInformada > new Date()) {
        mostrarErroCadastro('Digite uma data de nascimento válida.');
        return;

    }

    if (!/^[a-z0-9._-]{3,20}$/.test(usuario)) {
        mostrarErroCadastro('O usuário deve ter de 3 a 20 caracteres.');
        return;

    }
    if (senha.length < 6){
        mostrarErroCadastro('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    if (senha !== confirmarSenha){
        mostrarErroCadastro('As senhas não coincidem.');
        return;
    }
    
    const usuarios = obterUsuarios();
    const cadastroExistente = usuarios.some((item) =>
        item.email === email || item.usuario === usuario
    ); 

    if (cadastroExistente) {
        mostrarErroCadastro('Já existe um cadastro com este email ou usuário.');
        return;
    }

    usuarios.push({nome, email, dataNascimento, usuario, senha});
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    formularioCadastro.reset();
    mensagemSucessoCadastro.textContent = 'Cadastro realizado com sucesso!';


    setTimeout( () => {
        window.location.href = 'login.html';
    })

});