function addSkuRow(sku) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="produto">${sku.nome}</td>
        <td class="categoria">${sku.categoria}</td>
        <td class="qnt_estoque">${sku.qnt_estoque}</td>
        <td class="valor">${sku.valor}</td>
        <td class="valor_venda">${sku.valor_venda}</td>
        <td class="total_estoque">${sku.total_estoque}</td>
        <td class="status">${sku.status}</td>
        <td>
            <div class="row-actions"> 
                <button id='editar-cliente-btn' onclick='edit_sku_open(${JSON.stringify(sku)})'><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>
                <button><svg width="14" height="14" onclick='' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
            </div>
        </td>
    `;
    var body = document.getElementById('estoque-table-body');
    body.appendChild(tr);
}


function limpar_tabela_estoque() {
    var body = document.getElementById('estoque-table-body');
    body.replaceChildren()
}
addSkuRow({
    'nome': 'Unidade de estoque',
    'categoria': 'cat1',
    'qnt_estoque': '10',
    'valor': '1000',
    'valor_venda': '2000',
    'total_estoque': 0,
    'status': 'Em estoque!',
})



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
//   document.getElementById('editar-item-unidade').value = sku['unidade']
  document.getElementById('editar-item-qnt').value = sku['qnt_estoque']
  document.getElementById('editar-item-preco-un').value = sku['valor']
  document.getElementById('editar-item-preco-venda').value = sku['valor_venda']
}

async function editar_cliente() {
    var data = extract_form('editar-sku-nome', 'editar-sku-categoria', 'editar-item-qnt', 'editar-item-preco-un', 'editar-item-preco-venda')
    console.log('data extraida, data: ${}')
    if (!sku_editando_id) {
        return
    }
    swap_modal('modal-clientes');
    await edit_estoque_db(sku_editando_id, data)
    await listarEstoque();
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
        status: 'PLACEHOLDER',
      })
    });

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao editar sku:", erro);
  }
}

async function listarEstoque(filtro = "") {
  try {
    const url = filtro
      ? `https://fcsistemas-gestao.onrender.com/estoque?filtro=${encodeURIComponent(filtro)}`
      : `https://fcsistemas-gestao.onrender.com/estoque`;

    const resposta = await fetch(url);
    const clientes = await resposta.json();
    return clientes;
  } catch (erro) {
    console.error("Erro ao buscar clientes:", erro);
  }
  return []
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
        nome: sku['editar-sku-nome'],
        categoria: sku['editar-sku-categoria'],
        qnt: sku['editar-item-qnt'],
        valor: sku['editar-item-preco-un'],
        valor_venda: sku['editar-item-preco-venda'],
        status: 'PLACEHOLDER',
      })
    });

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao cadastrar cliente:", erro);
  }
}