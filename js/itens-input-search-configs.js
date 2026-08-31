var selectorWrapper = document.getElementById('produto-selector')
var selectorInput = document.getElementById('servico-produto-input')
var selectorHidden = document.getElementById('servico-produto-id')
var selectorDropdown = document.getElementById('produto-selector-dropdown')
var selectorDebounce = null

async function buscar_produtos(termo) {
    return await loadEstoque(termo)
}

function abrir_dropdown() {
    selectorDropdown.classList.add('active')
}

function fechar_dropdown() {
    selectorDropdown.classList.remove('active')
}

function selecionar_produto(produto) {
    selectorInput.value = produto.nome
    selectorHidden.value = produto.id
    fechar_dropdown()
}

function criar_handler_click(item) {
    function handler() {
        selecionar_produto(item)
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
        div.innerHTML = '<span class="nome">' + item.nome + '</span><span class="detalhe">' + item.valor + '</span>'
        div.onclick = criar_handler_click(item)
        selectorDropdown.appendChild(div)
    }
    abrir_dropdown()
}

async function buscar(termo) {
    selectorDropdown.innerHTML = '<div class="selector-loading">Buscando...</div>'
    abrir_dropdown()
    var resultados = await buscar_produtos(termo)
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