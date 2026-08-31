function service_row_button_presed(button) {
    var container = document.querySelector('#register-servico .servico-container .field')
    var itens = container.querySelectorAll(':scope > .servico-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    itens.forEach(
        (elemento) => {
            elemento.querySelector('.servico-button').value = '-'
        }
    )
    var html = `
        <div style="display: flex; gap: 10px;" class="servico-item">
            <input type="text" name="" class="servico-nome" placeholder="Serviço">
            <input type="text" name="" class="servico-preco" placeholder="valor" style="width: 10%;">
            <input type="button" name="" class="servico-button add" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="service_row_button_presed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', html)
}

function produto_row_button_pressed(button) {
    var container = document.querySelector('#register-servico .produtos-container .field')
    var itens = container.querySelectorAll(':scope > .produto-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    itens.forEach(
        (elemento) => {
            elemento.querySelector('.produto-button').value = '-'
        }
    )
    var html = `
        <div style="display: flex; gap: 10px;" class="produto-item">
            <input type="text" name="" class="produto-qnt" placeholder="0x" style="width: 10%;">
            <itens-input-search></itens-input-search>
            <div style="display: flex; align-items: center; flex-direction: column; justify-content: center;">
                <label for="" style="font-size: 10px;">Saída</label>
                <input type="checkbox" class="saida-do-estoque-check" checked>
            </div>
            <input type="button" name="" class="produto-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="produto_row_button_pressed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', html)
}

function obs_row_button_pressed(button) {
    var container = document.querySelector('#register-servico .obs-container .field')
    var itens = container.querySelectorAll(':scope > .obs-item')
    if (button.value == '-') {
        remove_row(button)
        return
    }
    itens.forEach(
        (elemento) => {
            elemento.querySelector('.obs-button').value = '-'
        }
    )
    var html = `
        <div style="display: flex; gap: 10px;" class="obs-item">
            <input type="text" name="" class="obs-nome" placeholder="Observação">
            <input type="button" name="" class="obs-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="obs_row_button_pressed(this)">
        </div>
    `
    container.insertAdjacentHTML('beforeend', html)
}

function remove_row(row) {
    row.parentElement.remove();
}

function reset_service_form() {
    var form = document.getElementById('register-servico').reset()
    document.querySelectorAll('#register-servico .servico-item, #register-servico .produto-item, #register-servico .obs-item').forEach(item => item.remove())
    document.querySelector('#register-servico .servico-container .field').insertAdjacentHTML('beforeend', `
        <div style="display: flex; gap: 10px;" class="servico-item">
            <input type="text" name="" class="servico-nome" placeholder="Serviço">
            <input type="text" name="" class="servico-preco" placeholder="valor" style="width: 10%;">
            <input type="button" name="" class="servico-button add" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="service_row_button_presed(this)">
        </div>
    `)
    document.querySelector('#register-servico .produtos-container .field').insertAdjacentHTML('beforeend', `
        <div style="display: flex; gap: 10px;" class="produto-item">
            <input type="text" name="" class="produto-qnt" placeholder="0x" style="width: 10%;">
            <itens-input-search></itens-input-search>
            <div style="display: flex; align-items: center; flex-direction: column; justify-content: center;">
                <label for="" style="font-size: 10px;">Saída</label>
                <input type="checkbox" class="saida-do-estoque-check" checked>
            </div>
            <input type="button" name="" class="produto-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="produto_row_button_pressed(this)">
        </div>
    `)
    document.querySelector('#register-servico .obs-container .field').insertAdjacentHTML('beforeend', `
        <div style="display: flex; gap: 10px;" class="obs-item">
            <input type="text" name="" class="obs-nome" placeholder="Observação">
            <input type="button" name="" class="obs-button" value="+" style="justify-self: flex-end; min-width: 10%; flex-grow: 0;" onclick="obs_row_button_pressed(this)">
        </div>
    `)
}




function salvar_servico(){
    dados = obter_dados_nota()
    if (dados==null) {
        return 
    }
    if (dados.servicos.length == 0 ){
        alert('Adicione pelo menos um serviço!')
        return
    } 
       // LANÇAR NOTA AQUI!-----------------------------------------------------⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
    swap_modal('modal-clientes'); 
    reset_service_form();
}



function obter_dados_nota() {
    var ok = true
    var cliente_id
    var servicos = []
    var produtos = []
    var observacoes = []

    cliente_id = document.querySelector('client-input-search').shadowRoot.getElementById('servico-cliente-id').value
    if (cliente_id == '') {
        alert('Selecione um cliente válido!')
        return null
    }

    document.querySelector(
        '#register-servico .servico-container .field'
    ).querySelectorAll(':scope > .servico-item').forEach(
        (servico)=>{
            var nome = servico.querySelector('.servico-nome').value
            var preco = servico.querySelector('.servico-preco').value
            if (nome =='') {
                return
            }
            if (preco == '') {
                preco = '0'
            }
            servicos.push(
                {
                    'nome':nome,
                    'preco':preco
                })})
    
    document.querySelectorAll('#register-servico .produtos-container .field .produto-item').forEach(
        (produto)=>{
            var qnt = produto.querySelector('.produto-qnt').value
            if (qnt == '') {
                qnt = 1
            }
            var saida = produto.querySelector('.saida-do-estoque-check').checked
            var produto_id = produto.querySelector('itens-input-search').shadowRoot.getElementById('servico-produto-id').value
            if (produto_id != ''){
                produtos.push(
                    {
                        'qnt': qnt,
                        'id': produto_id,
                        'saida': saida
                    }
                )
            }
        })
    
    document.querySelectorAll('#modal-clientes .obs-container .field .obs-item').forEach(
        (obs)=> {
            var obs = obs.querySelector('.obs-nome').value
            if (obs != '') {
                observacoes.push(obs)
            }
        }
    )
    var data = {
        'cliente_id': cliente_id,
        'servicos': servicos,
        'produtos': produtos,
        'observacoes':observacoes,
    }
    console.log(data)
    if (ok){
        return data
    } else {
        return null
    }
}