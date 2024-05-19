import { numberFormatBR, limparFormatoReal } from './utils.js'
import { cart } from './script.js'
import { ocultarElemento, mostrarElemento, ocultarVoltarEsecaoDetalhes, sectionHero, sectionCarrinho, atualizarNumeroItens, numeroItens, irParaHome, sectionIdentifiquese } from './navegacao.js'
// pegar dados dos produtos

const btnAddCarrinho = document.querySelector('.btn__add_cart')
btnAddCarrinho.addEventListener('click', () => {
    // pegar dados do produto adicionado
    const produto = {
        id: document.querySelector('.detalhes span').innerHTML,
        nome: document.querySelector('.detalhes h4').innerHTML,
        modelo: document.querySelector('.detalhes h5').innerHTML,
        preco: document.querySelector('.detalhes h6').innerHTML.replace('R$&nbsp;', ''),
        tamanho: document.querySelector('input[type="radio"][name="size"]:checked').value
    }
    cart.push(produto) // adicionar o produto ao array cart -> carrinho
    ocultarVoltarEsecaoDetalhes()
    ocultarElemento(sectionHero)
    mostrarElemento(sectionCarrinho)
    atualizarCarrinho(cart)
    atualizarNumeroItens()
})

const corpoTabela = document.querySelector('.carrinho tbody')
const colunaTotal = document.querySelector('.coluna_total')
const atualizarCarrinho = (cart) => {
    corpoTabela.innerHTML = "" // limpar linhas da tabela

    cart.map( produto => {
        corpoTabela.innerHTML += `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td class='coluna_tamanho'>${produto.tamanho}</td>
                <td class='coluna_preco'>${produto.preco}</td>
                <td class='coluna_apagar'>
                    <span class="material-symbols-outlined" data-id="${produto.id}">
                        delete
                    </span>
                </td>
            </tr>
        `
    })

    const total = cart.reduce( (valorAcumulado, item) => {
        return valorAcumulado + limparFormatoReal(item.preco)
    }, 0)
    colunaTotal.innerHTML = numberFormatBR.format(total)
    spanSubTotal.innerHTML = numberFormatBR.format(total)
    spanTotalCompra.innerHTML = numberFormatBR.format(total + valorFrete - valorDesconto)
    
    acaoBotaoApagar()
    criarCompra() // aula 29
}

let compra = {}

const criarCompra = () => {
    const dataAtual = new Date().toLocaleString()
    compra = {
        dataCompra: dataAtual,
        carrinho: cart,
        totalCompra: limparFormatoReal(spanTotalCompra.innerHTML)
    }
    localStorage.setItem('carrinho', JSON.stringify(compra))
}

const acaoBotaoApagar = () => {
    const botaoApagar = document.querySelectorAll('.coluna_apagar span')
    botaoApagar.forEach( botao => {
        botao.addEventListener('click', () => {
            const id = botao.getAttribute('data-id')
            const posicao = cart.findIndex( item => item.id == id )
            cart.splice(posicao, 1)
            atualizarCarrinho(cart)
        })        
    })
    atualizarNumeroItens()
    // aula 28
    if(numeroItens.innerHTML <= 0) { 
        irParaHome()
    }
}

// aula 17
let valorFrete = 0
let valorDesconto = 0

const spanSubTotal = document.querySelector('.sub_total')
const spanFrete = document.querySelector('.valor_frete')
const spanDesconto = document.querySelector('.valor_desconto')
const spanTotalCompra = document.querySelector('.total_compra')

spanFrete.innerHTML = numberFormatBR.format(valorFrete)
spanDesconto.innerHTML = numberFormatBR.format(valorDesconto)

const btnContinuarCarrinho = document.querySelector('.btn_continuar')
btnContinuarCarrinho.addEventListener('click', () => {
    ocultarElemento(sectionCarrinho)
    if(usuarioLogado) {
        mostrarElemento(sectionPagamento)
        return
    }
    mostrarElemento(sectionIdentifiquese, 'flex')
})
