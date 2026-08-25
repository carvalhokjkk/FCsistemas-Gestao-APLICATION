function swap_class(element_id, class_swaped) {
    const element = document.getElementById(element_id);
    element.classList.toggle(class_swaped);
}


function swap_modal(modal_id) {
    swap_class(modal_id, 'active');
}


