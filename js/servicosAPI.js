function service_row_button_presed(button) {
    var container = document.querySelector('#register-servico .servico-container .field')
    var itens = container.querySelectorAll(':scope > .servico-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    itens.forEach(
        (elemento) => {
            elemento.querySelector('.servico-button').value = '-'
        }
    )
    var html = `
        <div style="display: flex; gap: 10px;" class="servico-item">
            <input type="text" name="" class="servico-nome" placeholder="Serviço">
            <input type="text" name="" class="servico-preco" placeholder="valor" style="width: 10%;">
            <input type="button" name="" class="servico-button add" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="service_row_button_presed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', html)
}

function produto_row_button_pressed(button) {
    var container = document.querySelector('#register-servico .produtos-container .field')
    var itens = container.querySelectorAll(':scope > .produto-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    itens.forEach(
        (elemento) => {
            elemento.querySelector('.produto-button').value = '-'
        }
    )
    var html = `
        <div style="display: flex; gap: 10px;" class="produto-item">
            <input type="text" name="" class="produto-qnt" placeholder="0x" style="width: 10%;">
            <itens-input-search></itens-input-search>
            <div style="display: flex; align-items: center; flex-direction: column; justify-content: center;">
                <label for="" style="font-size: 10px;">Saída</label>
                <input type="checkbox" class="saida-do-estoque-check" checked>
            </div>
            <input type="button" name="" class="produto-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="produto_row_button_pressed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', html)
}

function obs_row_button_pressed(button) {
    var container = document.querySelector('#register-servico .obs-container .field')
    var itens = container.querySelectorAll(':scope > .obs-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    itens.forEach(
        (elemento) => {
            elemento.querySelector('.obs-button').value = '-'
        }
    )
    var html = `
        <div style="display: flex; gap: 10px;" class="obs-item">
            <input type="text" name="" class="obs-nome" placeholder="Observação">
            <input type="button" name="" class="obs-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="obs_row_button_pressed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', html)
}

function remove_row(row) {
    row.parentElement.remove();
}

function reset_service_form() {
    var form = document.getElementById('register-servico').reset()
    document.querySelectorAll('#register-servico .servico-item, #register-servico .produto-item, #register-servico .obs-item').forEach(item => item.remove())
    document.querySelector('#register-servico .servico-container .field').insertAdjacentHTML('beforeend', `
        <div style="display: flex; gap: 10px;" class="servico-item">
            <input type="text" name="" class="servico-nome" placeholder="Serviço">
            <input type="text" name="" class="servico-preco" placeholder="valor" style="width: 10%;">
            <input type="button" name="" class="servico-button add" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="service_row_button_presed(this)">
        </div>
    `)
    document.querySelector('#register-servico .produtos-container .field').insertAdjacentHTML('beforeend', `
        <div style="display: flex; gap: 10px;" class="produto-item">
            <input type="text" name="" class="produto-qnt" placeholder="0x" style="width: 10%;">
            <itens-input-search></itens-input-search>
            <div style="display: flex; align-items: center; flex-direction: column; justify-content: center;">
                <label for="" style="font-size: 10px;">Saída</label>
                <input type="checkbox" class="saida-do-estoque-check" checked>
            </div>
            <input type="button" name="" class="produto-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="produto_row_button_pressed(this)">
        </div>
    `)
    document.querySelector('#register-servico .obs-container .field').insertAdjacentHTML('beforeend', `
        <div style="display: flex; gap: 10px;" class="obs-item">
            <input type="text" name="" class="obs-nome" placeholder="Observação">
            <input type="button" name="" class="obs-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="obs_row_button_pressed(this)">
        </div>
    `)
}


async function salvar_servico() {
    dados = await obter_dados_nota()
    if (dados==null) {
        return 
    }
    if (dados.servicos.length == 0 ){
        alert('Adicione pelo menos um serviço!')
        return
    }
    await post_servico(dados)
    swap_modal('modal-clientes'); 
    reset_service_form();
    await listar_servicos()
    listarEstoque()
    load_entradas()
}


async function obter_dados_nota() {
    var ok = true
    var titulo = ''
    var cliente_id
    var cliente_nome
    var servicos = []
    var produtos = []
    var observacoes = []
    var valor = 0

    titulo = document.querySelector('#titulo-servico').value
    cliente_id = document.querySelector('client-input-search').shadowRoot.getElementById('servico-cliente-id').value
    cliente_nome = document.querySelector('client-input-search').shadowRoot.getElementById('servico-cliente-input').value

    if (cliente_id == '') {
        alert('Selecione um cliente válido!')
        return null
    }

    document.querySelector('#register-servico .servico-container .field').querySelectorAll(':scope > .servico-item').forEach(
        (servico) => {
            var nome = servico.querySelector('.servico-nome').value
            var preco = servico.querySelector('.servico-preco').value

            if (nome == '') {
                return
            }

            if (preco == '') {
                preco = '0'
            }

            servicos.push({
                'nome': nome,
                'preco': preco
            })

            valor += parseFloat(preco.replace(',', '.')) || 0
        }
    )

    document.querySelectorAll('#register-servico .produtos-container .field .produto-item').forEach(
        (produto) => {
            var qnt = produto.querySelector('.produto-qnt').value

            if (qnt == '') {
                qnt = 1
            }
            var saida = produto.querySelector('.saida-do-estoque-check').checked
            var produto_id = produto.querySelector('itens-input-search').shadowRoot.getElementById('servico-produto-id').value
            var produto_nome = produto.querySelector('itens-input-search').shadowRoot.getElementById('servico-produto-input').value

            if (produto_id != '') {
                produtos.push({
                    'qnt': qnt,
                    'id': produto_id,
                    'saida': saida
                })
            } else {
                if (produto_nome != '') {
                    ok = false
                    alert('Produto não cadastrado no estoque!')
                }
            }
        }
    )

    document.querySelectorAll('#register-servico .obs-container .field .obs-item').forEach(
        (obs) => {
            var observacao = obs.querySelector('.obs-nome').value

            if (observacao != '') {
                observacoes.push(observacao)
            }
        }
    )

    if (!ok) {
        return null
    }

    return {
        'titulo': titulo,
        'cliente_id': cliente_id,
        'cliente_nome': cliente_nome,
        'servicos': servicos,
        'produtos': produtos,
        'observacoes': observacoes,
        'valor': valor
    }
}



async function post_servico(data) {
    try {
        const resposta = await fetch("https://fcsistemas-gestao.onrender.com/servicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: data['titulo'],
                cliente_id: data['cliente_id'],
                cliente_nome: data['cliente_nome'],
                servicos: JSON.stringify(data['servicos']),
                produtos: JSON.stringify(data['produtos']),
                observacoes: JSON.stringify(data['observacoes']),
                valor: data['valor']
            })
        });

        const dados = await resposta.json();
        return dados;

    } catch (erro) {
        console.error("Erro ao lançar servico:", erro);
    }
}

async function load_servicos(filtro = "") {
    try {
        const url = filtro
        ? `https://fcsistemas-gestao.onrender.com/servicos?filtro=${encodeURIComponent(filtro)}`
        : `https://fcsistemas-gestao.onrender.com/servicos`;

        const resposta = await fetch(url);
        const servicos = await resposta.json();
        return servicos;
    } catch (erro) {
        console.error("Erro ao buscar servicos:", erro);
    }
    return [];
    }


function add_servico_card(titulo, cliente_nome, servicos, valor_total, id) {
    var modelo = `
    <div class="servico-card">  
        <div class="nome">${titulo}</div>
        <div class="cliente">${cliente_nome}</div>
        <div class="servicos">
            <ul>
                <li>${servicos[0]['nome']}</li>
                ${servicos.length > 1 ? '<li>[...]</li>' : ''}
            </ul>
        </div>
        <div class="bottom">
            <div class="buttons">
                <button class="download-pdf" onclick="abrir_nota(${id})">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M8 3a2 2 0 0 0-2 2v3h12V5a2 2 0 0 0-2-2H8Zm-3 7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1v-4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5Zm4 11a1 1 0 0 1-1-1v-4h8v4a1 1 0 0 1-1 1H9Z" clip-rule="evenodd"/></svg>
                </button>
                <button class="delete">
                    <svg onclick='deletar_serviço(${id})' class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/></svg>
                </button>
            </div>
            <span class="preco">R$ ${valor_total}</span>
        </div>
    </div>`

    var container = document.querySelector('#box .servicos .servicos-container')
    container.insertAdjacentHTML('beforeend', modelo)
}

async function listar_servicos() {
    data = await load_servicos('')
    document.querySelector('#box .servicos .servicos-container').innerHTML = ''
    data.forEach(
        (dict) => {
            var servicos = JSON.parse(dict['servicos'])

            add_servico_card(dict['titulo'], dict['cliente_nome'], servicos, dict['valor'], dict['id'])
        }
    )
}

async function abrir_nota(id) {
    const nova_aba = window.open('', '_blank'); // abre antes do fetch pra evitar popup blocker
    const resposta = await fetch(`https://fcsistemas-gestao.onrender.com/servicos/${id}`);
    const html = await resposta.text();

    nova_aba.document.write(html);
    nova_aba.document.close();
}



async function deletar_servico(id) {
  try {
    const resposta = await fetch(`https://fcsistemas-gestao.onrender.com/servicos/${id}`, {
      method: "DELETE"
    });
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao deletar serviço:", erro);
  }
}

async function deletar_serviço(id) {
  if (!confirm('Tem certeza que deseja excluir este serviço?')) {
    return
  }
  await deletar_servico(id)
  await listar_servicos();
}


listar_servicos()