    async function add_entrada() {
        var operacao = (is_saida()) ? 'Saída' : 'Entrada'
        var produto_id = document.querySelector('#register-entrada itens-input-search').shadowRoot.querySelector('#servico-produto-id').value
        var produto_qnt = document.getElementById('entrada-produto-qnt').value
        if (!verify_entrada(produto_id, produto_qnt)) {
            return
        }
        swap_modal('modal-clientes');
        await save_entrada(operacao, produto_id, produto_qnt)
        await load_entradas()
        listarEstoque()
    }   

    function verify_entrada(produto_id, produto_qnt) {
        if (produto_id == '') {
            alert('Preencha o produto!')
            return false
        }
        if (produto_qnt == '') {
            alert('Preencha a quantidade')
            return false
        }
        return true
    }

    async function save_entrada(operacao, produto_id, produto_qnt) {
        try {
            const resposta = await fetch("https://fcsistemas-gestao.onrender.com/entradas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'operacao': operacao,
                'produto_id': produto_id,
                'qnt': produto_qnt
            })
            });
            const dados = await resposta.json();
            return dados
        } catch{
            console.log('erro')
        }
    }


    var entradas_data_filtro = ''
    var entradas_produto_filtro = ''


    async function load_entradas() {
        var params = new URLSearchParams()
        if (entradas_produto_filtro) params.append('produto', entradas_produto_filtro)
        if (entradas_data_filtro) params.append('data', converter_data_iso_br(entradas_data_filtro))

        var resposta = await fetch(`https://fcsistemas-gestao.onrender.com/entradas?${params.toString()}`)
        var dados = await resposta.json()
        listar_entradas(dados)
    }

    function listar_entradas(data) {
        var container = document.getElementById('entradas-table')
        container.innerHTML = ''    
        data.forEach(registro => {
            var html = `
                <tr>
                    <td class="operacao">
                        <div class="ico ${registro['operacao']}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/></svg>
                            ${registro['operacao']}
                        </div>
                    </td>
                    <td class="produto"> ${registro['produto']}</td>
                    <td class="qnt"> ${registro['qnt']}</td>
                    <td class="valor">R$ ${registro['valor']}</td>
                    <td class="data"> ${registro['data']}</td>
                </tr>
            `
            container.insertAdjacentHTML("afterbegin", html)
        });
    }

function converter_data_iso_br(dataIso) {
    if (!dataIso) return ''
    var partes = dataIso.split('-') // ['2026', '09', '09']
    return partes[2] + '/' + partes[1] + '/' + partes[0] // '09/09/2026'
}


async function atualizar_dados_entradas() {
  await load_entradas()
}
atualizar_dados_entradas()

