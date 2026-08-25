
class ClientTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<link rel="stylesheet" href="../css/table.css">
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
            <tbody id="client-table-body">

            </tbody>
        </table>
    </div>
</div>
    `;
  }
}

customElements.define('client-table', ClientTable);