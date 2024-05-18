// aula 20 validacoes
const formularioIdentificacao = document.querySelector('.form_identificacao')
const todosCamposObrigatorios = formularioIdentificacao.querySelectorAll('[required]')
const todosCampos = formularioIdentificacao.querySelectorAll('input')

const pegarDados = () => {
    const dados = {}
    todosCampos.forEach( campo => {
        dados[campo.id] = campo.value.trim()
    })
    return dados
}

const validacaoDoFormulario = () => {
    
    let formularioValido = true

    todosCamposObrigatorios.forEach( campoObrigatorio => {
        
        const isEmpty = campoObrigatorio.value.trim() === ''
        const isNotChecked = campoObrigatorio.type === 'checkbox' && !campoObrigatorio.checked
        
        if(isEmpty) {
            campoObrigatorio.classList.add('campo-invalido')
            campoObrigatorio.nextElementSibling.textContent = `${campoObrigatorio.id} obrigatorio`
            formularioValido = false
        } else {
            campoObrigatorio.classList.add('campo-valido')
            campoObrigatorio.classList.remove('campo-invalido')
            campoObrigatorio.nextElementSibling.textContent = ''
        }

        if(isNotChecked) {
            campoObrigatorio.parentElement.classList.add('erro')
            formularioValido = false
        } else {
            campoObrigatorio.parentElement.classList.remove('erro')
        }
  
    })

    return formularioValido

}

const btnFinalizarCadastro = document.querySelector('.btn_finalizar_cadastro')
btnFinalizarCadastro.addEventListener('click', (event) => {
    
    event.preventDefault()
    
    // validacoes
    validacaoDoFormulario()

    // pegar dados
    if(validacaoDoFormulario()) {
        console.log(pegarDados())
        localStorage.setItem('dados', JSON.stringify(pegarDados()))
        formularioIdentificacao.reset()
        ocultarElemento(sectionIdentificacao)
        mostrarElemento(sectionPagamento)
    }
 
})

// validacao onBlur
todosCamposObrigatorios.forEach( campo => {

    const emailRegex = /\S+@\S+\.\S+/

    campo.addEventListener('blur', (e) => {

        if(campo.value !== "" && e.target.type !== "email") {
            campo.classList.add('campo-valido')
            campo.classList.remove('campo-invalido')
            campo.nextElementSibling.textContent = ''
        } else {
            campo.classList.add('campo-invalido')
            campo.classList.remove('campo-valido')
            campo.nextElementSibling.textContent = `${campo.id} é obrigatório`
        }

        if(emailRegex.test(e.target.value)) {
            campo.classList.add('campo-valido')
            campo.classList.remove('campo-invalido')
            campo.nextElementSibling.textContent = ''
        }

        if(e.target.type === "checkbox" && !e.target.checked) {
            campo.parentElement.classList.add('erro')
        } else {
            campo.parentElement.classList.remove('erro')
        }

    })

})

// aula 22
const buscarCep = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

document.querySelector('#cep1').addEventListener('blur', async (e) => {
    const cep = e.target.value

    if(!cep) {
        limparCampos()
        return
    }

    const resposta = await buscarCep(cep)
    if(resposta.erro) {
        limparCampos()
        return
    }

    preencherCampos(resposta)
    document.querySelector('#numero').focus()
})

const preencherCampos = (resposta) => {
    document.querySelector('#endereco').value = resposta.logradouro
    document.querySelector('#bairro').value = resposta.bairro
    document.querySelector('#cidade').value = resposta.localidade
    document.querySelector('#estado').value = resposta.uf
}

const limparCampos = () => {
    document.querySelector('#endereco').value = ''
    document.querySelector('#bairro').value = ''
    document.querySelector('#cidade').value = ''
    document.querySelector('#estado').value = ''
}
