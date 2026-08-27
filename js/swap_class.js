function swap_class(element_id, class_swaped) {
    const element = document.getElementById(element_id);
    element.classList.toggle(class_swaped);
}
function swap_class_byQuery(query, class_swaped) {
    const element = document.querySelector(query);
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

function swap_page_class(page, button) {
    const forms = document.querySelectorAll('#content .content-page');
    for (const form of forms) {
        form.classList.remove('active');
    }
    swap_class_byQuery(`#content .content-page.${page}`, 'active');

    const buttons = document.querySelectorAll('#nav-bar .nav-item');
    for (const button of buttons) {
        button.classList.remove('active');
    }
    button.classList.toggle('active')
}
 