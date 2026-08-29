class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<link rel="stylesheet" href="../css/sidebar.css">
<div id="sidebar">
    <div class="header">
        <div class="brand">
            <div class="title">
                <span>FC SISTEMAS</span>
                <span>GESTÃO</span>
            </div>
        </div>
    </div>
    <nav id="nav-bar">
        <div class="nav-item" onclick="swap_page_class('painel', this)">
            <div class="nav-ico">1</div>
            <span>Painel</span>
        </div>
        <div class="nav-item" onclick="swap_page_class('cliente', this)">
            <div class="nav-ico">2</div>
            <span>Clientes</span>
        </div>
        <div class="nav-item" onclick="swap_page_class('servicos', this)">
            <div class="nav-ico">3</div>
            <span>Serviços</span>
        </div>
        <div class="nav-item" onclick="swap_page_class('estoque', this)">
            <div class="nav-ico">4</div>
            <span>Estoque</span>
        </div>
    </nav>
    <div class="footer">
    </div>
</div>
    `;
  }
}

customElements.define('app-sidebar', AppSidebar);