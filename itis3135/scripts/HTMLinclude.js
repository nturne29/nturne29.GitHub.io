function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(element => {
        const file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                element.removeAttribute('data-include');
                includeHTML();
            })
            .catch(err => console.error('Error including HTML:', err));
    });
}
document.addEventListener('DOMContentLoaded', includeHTML);