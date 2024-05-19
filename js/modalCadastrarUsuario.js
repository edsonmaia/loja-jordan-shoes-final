import { mostrarElemento, irParaPagamento } from "./navegacao.js"
import { fecharModal, nomeUsuario, btnLogout } from "./modalLoginLogout.js"

let usuarioLogado = false

// aula 26 cadastrar usuario
const modalCadastrarUsuario = document.querySelector('.modal_cadastrar_usuario')
const overlayCadastrarUsuario = document.querySelector('.modal_overlay_cadastrar')
const btnCloseCadastrar = document.querySelector('.btn_close_cadastrar')
const linkCadastrar = document.querySelector('.link_cadastrar')
const btnCriarConta = document.querySelector('.btn_criar_conta')

document.addEventListener('click', (e) => {
    if(e.target === linkCadastrar || e.target === btnCriarConta) {
        e.preventDefault()
        fecharModal()
        modalCadastrarUsuario.classList.add('show')
        overlayCadastrarUsuario.classList.add('show')
    }
})

btnCloseCadastrar.addEventListener('click', () => {
    modalCadastrarUsuario.classList.remove('show')
    overlayCadastrarUsuario.classList.remove('show')
})

const formularioCadastrarUsuario = document.querySelector('.form_cadastrar_usuario')
const formAviso = document.querySelector('.form_aviso')

formularioCadastrarUsuario.addEventListener('submit', (e) => {
    e.preventDefault()
    // pegar dados, validar e autenticar
    const email = document.querySelector('#email_usuario').value
    const senha = document.querySelector('#senha_usuario').value
    const confirmaSenha = document.querySelector('#confirma_senha_usuario').value

    // validação
    const mensagemSenhaInvalida = senha.length < 5 ? 'Digite uma senha com no mínimo 5 caracteres' : 'Senha e confirmação SÃO diferentes'
    if(senha.length < 5 || senha !== confirmaSenha) {
        formAviso.innerHTML = mensagemSenhaInvalida
        return
    }

    // armazenar e autenticar - login
    formularioCadastrarUsuario.reset()
    formAviso.innerHTML = ''
    modalCadastrarUsuario.classList.remove('show')
    overlayCadastrarUsuario.classList.remove('show')

    const usuario = {
        email,
        senha
    }
    nomeUsuario.innerHTML = usuario.email
    mostrarElemento(btnLogout)
    usuarioLogado = true
    localStorage.setItem('nomeUsuario', nomeUsuario.innerHTML)
    irParaPagamento()

})
