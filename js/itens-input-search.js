class itensInputSearch extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
<style>
:host {
    display: block;
    width: 100%;
}
#produto-selector {
    position: relative;
    width: 100%;
}
input {
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
}
#servico-produto-input {
    padding: 12px 10px;
    border-radius: 10px;
    border: 1px solid #dad2c0;
    width: 100%;
    box-sizing: border-box;
}
.selector-dropdown {
    display: none;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    background-color: #FFFDF8;
    border: 1px solid #dad2c0;
    border-radius: 10px;
    max-height: 220px;
    overflow-y: auto;
    z-index: 20;
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
    box-sizing: border-box;
}
.selector-dropdown.active {
    display: block;
}
.selector-item {
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-bottom: 1px solid #f0ece0;
}
.selector-item:last-child {
    border-bottom: none;
}
.selector-item:hover {
    background-color: #f5f1e7;
}
.selector-item .nome {
    font-size: 14px;
    color: #12181f;
}
.selector-item .detalhe {
    font-size: 12px;
    color: #726a5b;
}
.selector-empty, .selector-loading {
    padding: 12px;
    font-size: 13px;
    color: #726a5b;
    text-align: center;
}
</style>
<div id="produto-selector">
    <input type="text" id="servico-produto-input" autocomplete="off">
    <input type="hidden" id="servico-produto-id" value="">
    <div class="selector-dropdown" id="produto-selector-dropdown"></div>
</div>
        `
        this.init_selector()
    }

    init_selector() {
        var selectorWrapper = this.shadowRoot.querySelector('#produto-selector')
        var selectorInput = this.shadowRoot.querySelector('#servico-produto-input')
        var selectorHidden = this.shadowRoot.querySelector('#servico-produto-id')
        var selectorDropdown = this.shadowRoot.querySelector('#produto-selector-dropdown')
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
    }
}

customElements.define('itens-input-search', itensInputSearch)