const sideMenu = document.getElementById('side-menu');
const sideMenuButton = document.getElementById('side-menu-button');
const menuProfileButton = document.getElementById('profile-icon');
const menuExitButton = document.querySelector('.exit-icon-container');

// Abre o menu lateral
sideMenuButton.addEventListener('click', () => {
    sideMenu.style.display = sideMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Abre o container do botão de sair
menuProfileButton.addEventListener('click', (event) => {
    event.stopPropagation();
    menuExitButton.style.display = menuExitButton.style.display === 'block' ? 'none' : 'block';
});

// Verifica se o clique foi dentro do container escolhido
document.addEventListener('click', (event) => {
    if (!sideMenu.contains(event.target) && !sideMenuButton.contains(event.target)) {
        sideMenu.style.display = 'none';
    }
    if (!menuExitButton.contains(event.target)) {
        menuExitButton.style.display  = 'none';
    }
});
