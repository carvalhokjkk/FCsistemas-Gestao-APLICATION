
class ClientTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<link rel="stylesheet" href="../css/client-table.css">
<div class="table-box">
    <div class="table">
        <table>
            <thead>
                <tr>
                    <th>CLIENTE</th>
                    <th>CONTATO</th>
                    <th>CIDADE</th>
                    <th>STATUS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="nome-cpf"><div><span class="nome">nome</span><span class="cpf">cpf</span></div></td>
                    <td class="contato">info2</td>
                    <td class="cidade">info3</td>
                    <td class="status">info4</td>
                    <td>
                        <div class="row-actions">
                            <button><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>
                            <button><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    `;
  }
}

customElements.define('client-table', ClientTable);