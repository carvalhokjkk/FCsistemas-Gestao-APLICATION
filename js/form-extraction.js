function extract_form(...elements) {
    var data = {}
    for(let i = 0; i < elements.length; i++) {
        data[elements[i]] = document.getElementById(elements[i]).value
    }

    return data
}
