function addSkuRow(sku) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="produto">${sku.nome}</td>
        <td class="categoria">${sku.categoria}</td>
        <td class="qnt_estoque">${sku.qnt}</td>
        <td class="valor">${sku.valor}</td>
        <td class="valor_venda">${sku.valor_venda}</td>
        <td class="total_estoque">${check_valor_em_estoque(sku.qnt, sku.valor)}</td>
        <td class="status">${check_status(sku.qnt_min, sku.qnt)}</td>
        <td>
            <div class="row-actions"> 
                <button id='editar-sku-btn' onclick='edit_sku_open(${JSON.stringify(sku)})'><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>
                <button><svg width="14" height="14" onclick='deletar_sku(${sku.id})' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
            </div>
        </td>
    `;
    var body = document.getElementById('estoque-table-body');
    body.appendChild(tr);
}


function check_valor_em_estoque(qnt, valor) {
  return  '$' + (qnt * valor)
}
function check_status(qnt_min, qnt) {
  qnt_min += 0
  qnt += 0
  if (qnt < 0) {
    return 'NEGATIVO'
  } 
  else if (qnt == 0) {
    return 'Fora de estoque'
  }
  else if (qnt < qnt_min) {
    return 'Baixo estoque'
  }
  else if (qnt > qnt_min) {
    return 'Em estoque!'
  }
}

function limpar_tabela_estoque() {
    var body = document.getElementById('estoque-table-body');
    body.replaceChildren()
}


var sku_editando_id = null
function edit_sku_open(sku) {
  swap_modal('modal-clientes');
  swap_modal_form('edit-sku-form');
  resgatar_dados_sku(sku)
  sku_editando_id = sku['id']
}

function resgatar_dados_sku(sku) {
  document.getElementById('editar-sku-nome').value = sku['nome']
  document.getElementById('editar-sku-categoria').value = sku['categoria']
  document.getElementById('editar-item-qnt').value = sku['qnt']
  document.getElementById('editar-item-preco-un').value = sku['valor']
  document.getElementById('editar-item-preco-venda').value = sku['valor_venda']
}

async function editar_sku() {
    console.log('clicado editar')
    var data = extract_form('editar-sku-nome', 'editar-sku-categoria', 'editar-item-qnt', 'editar-item-preco-un', 'editar-item-preco-venda', 'item-qnt-min')
    console.log('data extraida, data: ${}')
    if (!sku_editando_id) {
        return
    }
    var dataValidacao = {
        'sku-nome': data['editar-sku-nome'],
        'sku-categoria': data['editar-sku-categoria'],
        'item-qnt': data['editar-item-qnt'],
        'item-preco-un': data['editar-item-preco-un']
    }
    console.log('data validacao extraida')
    if (validar_sku(dataValidacao)) {
        swap_modal('modal-clientes');
        await edit_estoque_db(sku_editando_id, data)
        await listarEstoque();
    }
}

async function edit_estoque_db(id, sku) {
  try {
    const resposta = await fetch(`https://fcsistemas-gestao.onrender.com/estoque/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: sku['id'],
        nome: sku['editar-sku-nome'],
        categoria: sku['editar-sku-categoria'],
        qnt: sku['editar-item-qnt'],
        valor: sku['editar-item-preco-un'],
        valor_venda: sku['editar-item-preco-venda'],
        qnt_min: sku['item-qnt-min'],
        status: 'PLACEHOLDER',
      })
    });

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao editar sku:", erro);
  }
}


function validar_sku(data) {
  var validar_data = {
    'nome':data['sku-nome'],
    'categoria':data['sku-categoria'],
    'qnt':data['item-qnt'],
    'valor':data['item-preco-un']
  }
  console.log(validar_data)

  if (validar_data.nome == '') {
    console.log(data)
    alert('Preencha o nome do novo produto')
    return false
  }
  if (validar_data.categoria == '') {
    alert('Preencha a categoria do novo produto')
    return false
  }
  if (validar_data.qnt == '') {
    alert('Preencha a quantidade do novo produto')
    return false
  }
  if (validar_data.valor == ''){
    alert('Preencha o valor do novo produto')
    return false
  }
  return true
}


async function add_sku() {
    var data = extract_form('sku-nome', 'sku-categoria', 'item-qnt', 'item-preco-un', 'item-preco-venda', 'item-qnt-min')
    if (!validar_sku(data)){
      return
    }
    swap_modal('modal-clientes');
    document.getElementById('register-sku-form').reset()
    await cadastrarSku(data)
    await listarEstoque();
    return true
}


async function cadastrarSku(sku) {
  try {
    const resposta = await fetch("https://fcsistemas-gestao.onrender.com/estoque", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: sku['id'],
        nome: sku['sku-nome'],
        categoria: sku['sku-categoria'],
        qnt: sku['item-qnt'],
        valor: sku['item-preco-un'],
        valor_venda: sku['item-preco-venda'],
        status: 'PLACEHOLDER',
        qnt_min: sku['item-qnt-min']
      })
    });

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao cadastrar sku:", erro);
  }
}

async function loadEstoque(filtro = "") {
  try {
    const url = filtro
      ? `https://fcsistemas-gestao.onrender.com/estoque?filtro=${encodeURIComponent(filtro)}`
      : `https://fcsistemas-gestao.onrender.com/estoque`;

    const resposta = await fetch(url);
    const estoque = await resposta.json();
    return estoque;
  } catch (erro) {
    console.error("Erro ao buscar estoque:", erro);
  }
  return []
}

async function listarEstoque(filtro = ''){
  var estoque = await loadEstoque(filtro);
  limpar_tabela_estoque()
  for(let sku of estoque){
      addSkuRow(sku)
  }
}

async function deletar_sku_db(id) {
  try {
    const resposta = await fetch(`https://fcsistemas-gestao.onrender.com/estoque/${id}`, {
      method: "DELETE"
    });
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao deletar sku:", erro);
  }
}

async function deletar_sku(id) {
  if (!confirm('Tem certeza que deseja excluir este item?')) {
    return
  }
  await deletar_sku_db(id)
  await listarEstoque();
}

listarEstoque();