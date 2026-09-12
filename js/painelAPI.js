async function get_baixo_estoque() {
    var resposta = await fetch('https://fcsistemas-gestao.onrender.com/estoque/critico')
    var dados = await resposta.json()
    return dados
}
async function get_estoque() {
    var resposta = await fetch('https://fcsistemas-gestao.onrender.com/estoque')
    var dados = await resposta.json()
    var valor = 0
    dados.forEach(item => {
        valor += parseFloat(item['qnt']) * parseFloat(item['valor'])
    });
    return {
        'valor': valor,
        'qnt': dados.length
    }
}


async function get_clients_qnt() {
    resposta = await fetch('https://fcsistemas-gestao.onrender.com/clientes')
    dados = await resposta.json()
    return dados.length
}
async function get_servicos_dia() {
    var result =await fetch('https://fcsistemas-gestao.onrender.com/servicos/hoje')
    var json = await result.json()
    return json
}






async function atualizar_dados_painel() {
    var baixo_estoque = await get_baixo_estoque()
    var estoque = await get_estoque()
    var servicos_dia = await get_servicos_dia()

    var clientes_cadastrados = document.querySelector('.content-page.painel .clientes .value')
    clientes_cadastrados.innerHTML = await get_clients_qnt()

    var produtos_em_estoque = document.querySelector('.content-page.painel .produtos-qnt .value')
    var produtos_em_estoque_comp = document.querySelector('.content-page.painel .produtos-qnt .complementar')
    produtos_em_estoque.innerHTML = estoque['qnt'] - baixo_estoque.length
    produtos_em_estoque_comp.innerHTML = `<b>${baixo_estoque.length}</b> produtos fora de estoque` 

    var valor_estoque = document.querySelector('.content-page.painel .estoque-valor .value')
    valor_estoque.innerHTML = `R$ ${estoque['valor']}`


    document.querySelector('.content-page.painel .servicos-recentes table').innerHTML = ''
    baixo_estoque.forEach(
        (item) => {
            add_estoque_alerta(item[1], item[3], check_status(item[7], item[3]))
        }
    )
    document.querySelector('.content-page.painel .produtos-criticos table').innerHTML = ''
    servicos_dia.forEach(
        (servico) => {
            add_servico_dia_column(servico['titulo'], servico['cliente_nome'], servico['valor'])
        }
    )
}

function add_servico_dia_column(titulo, cliente_nome, valor) {
    var container = document.querySelector('.content-page.painel .servicos-recentes table')
    var html = `                                        
        <tr>
            <td>${titulo}</td>
            <td>${cliente_nome}</td>
            <td>R$ ${valor}</td>
        </tr>
    `
    container.insertAdjacentHTML('beforeend', html)
}

function add_estoque_alerta(nome, qnt, status) {
    var container = document.querySelector('.content-page.painel .produtos-criticos table')
    var html = `                                        
    <tr>
        <td>${nome}</td>
        <td>${qnt}</td>
        <td class="status ${check_status_class(status)}"><span>${status}</span></td>
    </tr>
    `
    container.insertAdjacentHTML('beforeend', html)
}

atualizar_dados_painel()
