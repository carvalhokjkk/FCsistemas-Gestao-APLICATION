document.getElementById('switcher-entrada-saida').addEventListener('click', function() {
    this.classList.toggle('saida');
});

function is_saida() {
    return document.getElementById('switcher-entrada-saida').classList.contains('saida');
}