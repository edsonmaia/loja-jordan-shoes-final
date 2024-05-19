import { irParaHome, numeroItens, ocultarElemento } from './navegacao.js'

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
    numeroItens.innerHTML = 0
    ocultarElemento(numeroItens)
    // cart = []
    // atualizarCarrinho(cart)
    // atualizarNumeroItens()
    // console.log(pedido)
    // console.log(localStorage.getItem('pedido'))
    console.log(JSON.parse(localStorage.getItem('pedido')))
})
// /aula 29
