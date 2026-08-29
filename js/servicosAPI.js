function service_row_button_presed(button) {
    var container = document.querySelector('#register-servico .servico-container .field')
    var services_itens = container.querySelectorAll(':scope > div')
    if (button.value == '-') {
        remove_service_row(button)
        return
    }
    services_itens.forEach(
        (elemento) => {
            elemento.querySelector('.serviço-cliente-button').value = '-'
        }
    )
    var service_html = `
        <div style="display: flex; gap: 10px;" class="servico-item">
            <input type="text" name="" class="serviço-cliente-nome" placeholder="Serviço">
            <input type="text" name="" class="serviço-cliente-preco" placeholder="valor" style="width: 10%;">
            <input type="button" name="" class="serviço-cliente-button add" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="service_row_button_presed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', service_html)

}

function remove_service_row(row) {
    row.parentElement.remove();
}
