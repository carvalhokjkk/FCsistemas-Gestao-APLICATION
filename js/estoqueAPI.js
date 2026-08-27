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
                <button id='editar-cliente-btn' onclick=''><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>
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
    'categoria': 'Armazém',
    'qnt_estoque': 'Armazém',
    'valor': 'Armazém',
    'valor_venda': 'Armazém',
    'total_estoque': 'Armazém',
    'status': 'Em estoque!',
})