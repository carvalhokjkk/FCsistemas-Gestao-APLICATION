class EstoqueTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<link rel="stylesheet" href="../css/table.css">
<div class="table-box">
    <div class="table">
        <table>
            <thead>
                <tr>
                    <th>PRODUTO</th>
                    <th>CATEGORIA</th>
                    <th>QNT. EM ESTOQUE</th>
                    <th>VALOR</th>
                    <th>VALOR DE VENDA</th>
                    <th>TOTAL EM ESTOQUE</th>
                    <th>STATUS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="estoque-table-body">
            </tbody>
        </table>
    </div>
</div>
    `;
  }
}

customElements.define('estoque-table', EstoqueTable);