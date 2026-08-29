class clientInputSearch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<style>
input {
    outline: none;
    border: none;
}
#cliente-selector {
    position: relative;
    width: 90%;
}
#servico-cliente-input {
    padding: 12px 10px;
    border-radius: 10px;
    border: 1px solid #dad2c0;
    width: 100%;
}
.selector-dropdown {
    display: none;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    background-color: #FFFDF8;
    border: 1px solid #dad2c0;
    border-radius: 10px;
    max-height: 220px;
    overflow-y: auto;
    z-index: 20;
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
}
.selector-dropdown.active {
    display: block;
}
.selector-item {
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-bottom: 1px solid #f0ece0;
}
.selector-item:last-child {
    border-bottom: none;
}
.selector-item:hover {
    background-color: #f5f1e7;
}
.selector-item .nome {
    font-size: 14px;
    color: #12181f;
}
.selector-item .detalhe {
    font-size: 12px;
    color: #726a5b;
}
.selector-dropdown .selector-empty, .selector-dropdown .selector-loading {
    padding: 12px;
    font-size: 13px;
    color: #726a5b;
    text-align: center;
}
</style>

<div id="cliente-selector">
    <input type="text" id="servico-cliente-input" autocomplete="off">
    <input type="hidden" id="servico-cliente-id" value="">
    <div class="selector-dropdown" id="cliente-selector-dropdown"></div>
</div>
    `;
  }
}

customElements.define('client-input-search', clientInputSearch);