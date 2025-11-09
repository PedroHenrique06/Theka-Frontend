

const sideMenu = document.getElementById('side-menu');
const sideMenuButton = document.getElementById('side-menu-button');

// Abre o menu lateral
sideMenuButton.addEventListener('click', () => {
    sideMenu.style.display = sideMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Verifica se o clique foi dentro do menu lateral
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !sideMenuButton.contains(e.target)) {
        sideMenu.style.display = "none";
    }
});