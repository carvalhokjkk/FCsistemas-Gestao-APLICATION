var selectorWrapper = document.getElementById('cliente-selector')
var selectorInput = document.getElementById('servico-cliente-input')
var selectorHidden = document.getElementById('servico-cliente-id')
var selectorDropdown = document.getElementById('cliente-selector-dropdown')
var selectorDebounce = null

async function buscar_clientes(termo) {
    return await listarClientes(termo)
}

function abrir_dropdown() {
    selectorDropdown.classList.add('active')
}

function fechar_dropdown() {
    selectorDropdown.classList.remove('active')
}

function selecionar_cliente(cliente) {
    selectorInput.value = cliente.nome
    selectorHidden.value = cliente.id
    fechar_dropdown()
}

function criar_handler_click(item) {
    function handler() {
        selecionar_cliente(item)
    }
    return handler
}

function render_resultados(itens) {
    if (itens.length == 0) {
        selectorDropdown.innerHTML = '<div class="selector-empty">Nenhum resultado encontrado</div>'
        abrir_dropdown()
        return
    }
    selectorDropdown.replaceChildren()
    for (var i = 0; i < itens.length; i++) {
        var item = itens[i]
        var div = document.createElement('div')
        div.className = 'selector-item'
        div.innerHTML = '<span class="nome">' + item.nome + '</span><span class="detalhe">' + item.cpf + '</span>'
        div.onclick = criar_handler_click(item)
        selectorDropdown.appendChild(div)
    }
    abrir_dropdown()
}

async function buscar(termo) {
    selectorDropdown.innerHTML = '<div class="selector-loading">Buscando...</div>'
    abrir_dropdown()
    var resultados = await buscar_clientes(termo)
    render_resultados(resultados)
}

function on_input_change() {
    var termo = selectorInput.value.trim()
    selectorHidden.value = ''
    clearTimeout(selectorDebounce)
    if (termo.length < 1) {
        fechar_dropdown()
        return
    }
    selectorDebounce = setTimeout(function() { buscar(termo) }, 300)
}

function on_click_fora(e) {
    if (!selectorWrapper.contains(e.target)) {
        fechar_dropdown()
    }
}

selectorInput.addEventListener('input', on_input_change)
document.addEventListener('click', on_click_fora)