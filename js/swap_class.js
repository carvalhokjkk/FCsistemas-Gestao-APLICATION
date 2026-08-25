function swap_class(element_id, class_swaped) {
    const element = document.getElementById(element_id);
    element.classList.toggle(class_swaped);
}


function swap_modal(modal_id) {
    swap_class(modal_id, 'active');
}

function swap_modal_form(form_id) {
    const forms = document.querySelectorAll('#modal-clientes .modal form');
    for (const form of forms) {
    form.classList.remove('active');
    }
    swap_class(form_id, 'active');
}


