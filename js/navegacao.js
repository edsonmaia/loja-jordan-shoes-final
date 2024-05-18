import { cart } from './script.js'

const sectionHero = document.querySelector('.hero')
const sectionProdutos = document.querySelector('.produtos')
const botaoVoltar = document.querySelector('.voltar')
const sectionDetalhesProduto = document.querySelector('.produto__detalhes')
const sectionCarrinho = document.querySelector('.carrinho')
// aula 18
const sectionIdentificacao = document.querySelector('.identificacao')
const sectionPagamento = document.querySelector('.pagamento')
// aula 27
const sectionIdentifiquese = document.querySelector('.identifique-se')

// ocultar ou mostrar elemento
const ocultarElemento = (elemento) => {
    elemento.style.display = 'none'
}

const mostrarElemento = (elemento, display='block') => {
    elemento.style.display = display
}

ocultarElemento(sectionIdentificacao)
ocultarElemento(sectionPagamento)
ocultarElemento(sectionIdentifiquese)

// NAVEGACAO
// aula 28
const irParaHome = () => {
    ocultarElemento(sectionPagamento)
    ocultarElemento(sectionIdentificacao)
    ocultarElemento(sectionIdentifiquese)
    ocultarElemento(sectionCarrinho)
    ocultarElemento(botaoVoltar)
    ocultarElemento(sectionDetalhesProduto)
    mostrarElemento(sectionHero, 'flex')
    mostrarElemento(sectionProdutos, 'flex')
}

// aula 29
const irParaPagamento = () => {
    ocultarElemento(sectionIdentifiquese)
    if(numeroItens.innerHTML > 0) {
        ocultarElemento(sectionHero)
        ocultarElemento(sectionProdutos)
        ocultarVoltarEsecaoDetalhes()
        ocultarElemento(sectionCarrinho)
        mostrarElemento(sectionPagamento)
    }
}

const ocultarVoltarEsecaoDetalhes = () => {
    ocultarElemento(botaoVoltar)
    ocultarElemento(sectionDetalhesProduto)
}
ocultarVoltarEsecaoDetalhes()

botaoVoltar.addEventListener('click', () => {
    mostrarElemento(sectionProdutos, 'flex')
    ocultarVoltarEsecaoDetalhes()
})

const btnCarrinho = document.querySelector('.btn__carrinho .icone')
btnCarrinho.addEventListener('click', () => {
    if(numeroItens.innerHTML > 0) {
        mostrarElemento(sectionCarrinho)
        ocultarElemento(sectionHero)
        ocultarElemento(sectionProdutos)
        ocultarElemento(sectionDetalhesProduto)
        ocultarElemento(sectionIdentificacao)
        ocultarElemento(sectionPagamento)
    }
})

const btnHome = document.querySelector('.link_home')
btnHome.addEventListener('click', (event) => {
    event.preventDefault()
    irParaHome() // aula 28
})

// NUMERO DE ITENS do CARRINHO
const numeroItens = document.querySelector('.numero_itens')
ocultarElemento(numeroItens)

const atualizarNumeroItens = () => {
    numeroItens.style.display = cart.length ? 'block' : 'none'
    numeroItens.innerHTML = cart.length
}

export {
    ocultarElemento,
    mostrarElemento,
    irParaHome,
    irParaPagamento,
    ocultarVoltarEsecaoDetalhes,
    botaoVoltar,
    numeroItens,
    sectionHero,
    sectionProdutos,
    sectionDetalhesProduto,
    sectionIdentifiquese,
    sectionIdentificacao,
    sectionCarrinho,
    sectionPagamento,
    atualizarNumeroItens
}
