const buttonSelected = document.querySelectorAll('.button-container');

// Adiciona a função de selecionar o botão ativo
buttonSelected.forEach(button => {
    button.addEventListener('click', changeActiveButton);
});

// Função para mudar o botão ativo
function changeActiveButton(event) {
    buttonSelected.forEach(button => {
        button.classList.remove('active');
    });

    event.currentTarget.classList.add('active');
}