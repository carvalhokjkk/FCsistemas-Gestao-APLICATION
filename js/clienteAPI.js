async function add_cliente() {
    var data = extract_form('cliente-nome', 'cliente-cpf', 'cliente-numero', 'cliente-status', 'cliente-email', 'cliente-endereco')
    if (validar_cliente(data)) {
        swap_modal('modal-clientes');
        document.getElementById('register-client-form').reset()
        await cadastrarCliente(data)
        await load_tabela();
        return true
    }
    return false
}

function validar_cliente(data) {
    if (data['cliente-nome'] == '') {
        alert('Preencha o nome do cliente!')
        return false
    } else if(data['cliente-cpf'] == '') {
        alert('Preencha o CPF/CNPJ do cliente!')
        return false
    } else if(data['cliente-status'] == '') {
        data['cliente-status'] = 'Ativo'
        return false
    }
    if (data['cliente-cpf'].length != 11) {
        if (data['cliente-cpf'].length == 14) {
            return true
        } 

        alert('Preencha um CPF/CPNJ válido!')
        return false
    }
    return true
}


async function cadastrarCliente(cliente) {
  try {
    const resposta = await fetch("https://fcsistemas-gestao.onrender.com/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: cliente['cliente-nome'],
        cpf: cliente['cliente-cpf'],
        numero: cliente['cliente-numero'],
        status: cliente['cliente-status'],
        email: cliente['cliente-email'],
        endereco: cliente['cliente-endereco']
      })
    });

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao cadastrar cliente:", erro);
  }
}

async function listarClientes(filtro = "") {
  try {
    const url = filtro
      ? `https://fcsistemas-gestao.onrender.com/clientes?filtro=${encodeURIComponent(filtro)}`
      : `https://fcsistemas-gestao.onrender.com/clientes`;

    const resposta = await fetch(url);
    const clientes = await resposta.json();
    return clientes;
  } catch (erro) {
    console.error("Erro ao buscar clientes:", erro);
  }
  return []
}

function addClientRow(cliente) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="contato">${cliente.id}</td>
        <td class="nome-cpf"><div><span class="nome">${cliente.nome}</span><span class="cpf">${cliente.cpf}</span></div></td>
        <td class="contato">${cliente.email}</td>
        <td class="cidade">${cliente.endereco}</td>
        <td class="status">${cliente.status}</td>
        <td>
            <div class="row-actions"> 
                <button id='editar-cliente-btn' onclick='edit_client_open(${JSON.stringify(cliente)})'><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>
                <button><svg width="14" height="14" onclick='deletar_cliente(${cliente.id})' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
            </div>
        </td>
    `;
    var body = document.getElementById('client-table-body');
    body.appendChild(tr);
}
function limpar_tabela() {
    var body = document.getElementById('client-table-body');
    body.replaceChildren()
}

async function load_tabela(filtro = ''){
    var clientes = await listarClientes(filtro);
    limpar_tabela()
    for(let cliente of clientes){
        addClientRow(cliente)
    }
}
load_tabela();


function edit_client_open(cliente) {
  swap_modal('modal-clientes');
  swap_modal_form('edit-client-form');
  resgatar_dados_cliente(cliente)
  editando_id = cliente['id']
}
function resgatar_dados_cliente(cliente) {
  document.getElementById('editar-cliente-nome').value = cliente['nome']
  document.getElementById('editar-cliente-cpf').value = cliente['cpf']
  document.getElementById('editar-cliente-numero').value = cliente['numero']
  document.getElementById('editar-cliente-status').value = cliente['status']
  document.getElementById('editar-cliente-email').value = cliente['email']
  document.getElementById('editar-cliente-endereco').value = cliente['endereco']
}

async function editar_cliente() {
  console.log('clicado editar')
  var data = extract_form('editar-cliente-nome', 'editar-cliente-cpf', 'editar-cliente-numero', 'editar-cliente-status', 'editar-cliente-email', 'editar-cliente-endereco')
  console.log('data extraida, data: ${}')
  if (!editando_id) {
    return
  }
  var dataValidacao = {
    'cliente-nome': data['editar-cliente-nome'],
    'cliente-cpf': data['editar-cliente-cpf'],
    'cliente-numero': data['editar-cliente-numero'],
    'cliente-status': data['editar-cliente-status'],
    'cliente-email': data['editar-cliente-email'],
    'cliente-endereco': data['editar-cliente-endereco']
  }
  console.log('data validacao extraida')
  if (validar_cliente(dataValidacao)) {
    swap_modal('modal-clientes');
    await edit_cliente_db(editando_id, data)
    await load_tabela();
  }
}

let editando_id = null
async function edit_cliente_db(id, cliente) {
  try {
    const resposta = await fetch(`https://fcsistemas-gestao.onrender.com/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: cliente['editar-cliente-nome'],
        cpf: cliente['editar-cliente-cpf'],
        numero: cliente['editar-cliente-numero'],
        status: cliente['editar-cliente-status'],
        email: cliente['editar-cliente-email'],
        endereco: cliente['editar-cliente-endereco']
      })
    });

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao editar cliente:", erro);
  }
}


async function deletar_cliente_db(id) {
  try {
    const resposta = await fetch(`https://fcsistemas-gestao.onrender.com/clientes/${id}`, {
      method: "DELETE"
    });
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao deletar cliente:", erro);
  }
}

async function deletar_cliente(id) {
  if (!confirm('Tem certeza que deseja excluir este cliente?')) {
    return
  }
  await deletar_cliente_db(id)
  await load_tabela();
}