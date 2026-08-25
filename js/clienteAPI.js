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
    console.log("Clientes encontrados:", clientes);
    return clientes;
  } catch (erro) {
    console.error("Erro ao buscar clientes:", erro);
  }
}

function addClientRow(cliente) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="nome-cpf"><div><span class="nome">${cliente.nome}</span><span class="cpf">${cliente.cpf}</span></div></td>
        <td class="contato">${cliente.contato}</td>
        <td class="cidade">${cliente.cidade}</td>
        <td class="status">${cliente.status}</td>
        <td>
            <div class="row-actions">
                <button><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>
                <button><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
            </div>
        </td>
    `;
    var body = document.getElementById('client-table-body');
    body.appendChild(tr);
}