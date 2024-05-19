import {
    ocultarElemento,
    mostrarElemento,
    irParaHome,
    irParaPagamento
} from './navegacao.js'

export let usuarioLogado = false

// aula 25
const btnOpenLogin = document.querySelector('#btn_open_login')
const modalLogin = document.querySelector('.modal_login')
const overlayLogin = document.querySelector('.modal_overlay')
const btnCloseLogin = document.querySelector('.btn_close_login')
const btnFazerLogin = document.querySelector('.btn_fazer_login') // aula 27

document.addEventListener('click', (e) => {
    if(e.target === btnOpenLogin || e.target === btnFazerLogin) {
        (!usuarioLogado) && mostrarModal() // ajuste aula 28
    }
})

document.addEventListener('click', (event) => {
    if(event.target === overlayLogin || event.target === btnCloseLogin) {
        fecharModal()
    }
})

const mostrarModal = () => {
    modalLogin.classList.add('show')
    overlayLogin.classList.add('show')
}

export const fecharModal = () => {
    modalLogin.classList.remove('show')
    overlayLogin.classList.remove('show')
}

// controle de login
export const nomeUsuario = document.querySelector('#nome_usuario')
export const btnLogout = document.querySelector('#btn_logout')
const formularioLogar = document.querySelector('.form_logar')
const emailLogin = document.querySelector('#email_login')
const senhaLogin = document.querySelector('#senha_login')

ocultarElemento(btnLogout) // esconder o botao Sair

formularioLogar.addEventListener('submit', (e) => {
    e.preventDefault()
    // pegar dados e validar para autorizar entrada
    nomeUsuario.innerHTML = emailLogin.value
    mostrarElemento(btnLogout)
    formularioLogar.reset()
    fecharModal()
    usuarioLogado = true
    localStorage.setItem('nomeUsuario', nomeUsuario.innerHTML)
    irParaPagamento()
})

const logout = () => {
    ocultarElemento(btnLogout)
    nomeUsuario.innerHTML = ''
    usuarioLogado = false
    localStorage.removeItem('nomeUsuario')
    localStorage.removeItem('carrinho')
    irParaHome()
}

btnLogout.addEventListener('click', logout)
