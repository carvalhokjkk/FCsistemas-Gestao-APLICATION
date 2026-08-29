function service_row_button_presed(button) {
    var container = document.querySelector('#register-servico .servico-container .field')
    var services_itens = container.querySelectorAll(':scope > .servico-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    services_itens.forEach(
        (elemento) => {
            elemento.querySelector('.servico-button').value = '-'
        }
    )
    var service_html = `
        <div style="display: flex; gap: 10px;" class="servico-item">
            <input type="text" name="" class="servico-nome" placeholder="Serviço">
            <input type="text" name="" class="servico-preco" placeholder="valor" style="width: 10%;">
            <input type="button" name="" class="servico-button add" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="service_row_button_presed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', service_html)
}

function produto_row_button_pressed(button) {
    var container = document.querySelector('#register-servico .produtos-container .field')
    var services_itens = container.querySelectorAll(':scope > .produto-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    services_itens.forEach(
        (elemento) => {
            elemento.querySelector('.produto-button').value = '-'
        }
    )
    var service_html = `
        <div style="display: flex; gap: 10px;" class="produto-item">
            <input type="text" name="" class="procuto-nome" placeholder="Produto">
            <input type="button" name="" class="produto-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="produto_row_button_pressed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', service_html)
}

function obs_row_button_pressed(button) {
    var container = document.querySelector('#register-servico .obs-container .field')
    var services_itens = container.querySelectorAll(':scope > .obs-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    services_itens.forEach(
        (elemento) => {
            elemento.querySelector('.obs-button').value = '-'
        }
    )
    var service_html = `
        <div style="display: flex; gap: 10px;" class="obs-item">
            <input type="text" name="" class="obs-nome" placeholder="Observação">
            <input type="button" name="" class="obs-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="obs_row_button_pressed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', service_html)
}


function remove_row(row) {
    row.parentElement.remove();
}