function extract_form(...elements) {
    var data = {}
    for(let i = 0; i < elements.length; i++) {
        data[elements[i]] = document.getElementById(elements[i]).value
    }
    return data
}

function add_cliente() {
    var data = extract_form('cliente-nome', 'cliente-cpf', 'cliente-numero', 'cliente-status', 'cliente-email', 'cliente-endereco')
    if (validar_cliente(data)) {
        document.getElementById('register-client-form').reset()
        cadastrarCliente(data)
        return true
    }
    return false
}
function validar_cliente(data) {
    if (data['cliente-nome'] == '') {
        alert('Preencha o nome do cliente!')
        return false
    } else if(data['cliente-cpf'] == '') {
        alert('Preencha o CPF/CNPJ do cliente!')
        return false
    } else if(data['cliente-status'] == '') {
        data['cliente-status'] = 'Ativo'
        return false
    }
    if (data['cliente-cpf'].length != 11) {
        if (data['cliente-cpf'].length == 14) {
            return true
        } 
        console.log(data['cliente-cpf'].length)
        alert('Preencha um CPF/CPNJ válido!')
        return false
    }
    return true
}