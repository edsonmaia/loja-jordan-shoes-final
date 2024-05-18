import {
    ocultarElemento,
    mostrarElemento,
    irParaHome,
    irParaPagamento,
    atualizarNumeroItens
} from './navegacao.js'
import { } from './pageHomeDetalhes.js'
import { } from './pageCarrinho.js'
import { } from './pageIdentificacao.js'

export let cart = []

// aula 28
export let usuarioLogado = false

// PAGE HOME
// PAGE DETALHES
// PAGE carrinho
// PAGE Identificacao

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

const fecharModal = () => {
    modalLogin.classList.remove('show')
    overlayLogin.classList.remove('show')
}

// controle de login
const nomeUsuario = document.querySelector('#nome_usuario')
const btnLogout = document.querySelector('#btn_logout')
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

// aula 29
// pegar os dados do pagamento
const formularioPagamento = document.querySelector('.form_pagamento')
const numeroCartao = document.querySelector('#numero_cartao')
const nomeImpresso = document.querySelector('#nome_impresso')
const validade = document.querySelector('#validade')
const codigoSeguranca = document.querySelector('#codigo_seguranca')
const numeroParcelas = document.querySelector('#numero_parcelas')

formularioPagamento.addEventListener('submit', (e) => {
    e.preventDefault()
    let cartao = {
        numeroCartao: numeroCartao.value,
        nomeImpresso: nomeImpresso.value,
        validade: validade.value,
        codigoSeguranca: codigoSeguranca.value,
        numeroParcelas: numeroParcelas.value
    }
    console.log(cartao)

    // pedido
    const pedido = {
        id: 1,
        usurio: localStorage.getItem('nomeUsuario'),
        carrinho: JSON.parse(localStorage.getItem('carrinho')),
        cartao: cartao
    }
    localStorage.setItem('pedido', JSON.stringify(pedido))
    // limpar formulario e ir para home
    formularioPagamento.reset()
    irParaHome()
    cart = []
    atualizarCarrinho(cart)
    atualizarNumeroItens()
    console.log(pedido)
    console.log(localStorage.getItem('pedido'))
})
// /aula 29
