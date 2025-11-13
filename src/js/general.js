const sideMenu = document.getElementById('side-menu');
const sideMenuButton = document.getElementById('side-menu-button');
const menuProfileButton = document.getElementById('profile-icon');
const menuExitButton = document.getElementById('exit-icon');

// Abre o menu lateral
sideMenuButton.addEventListener('click', () => {
    sideMenu.style.display = sideMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Verifica se o clique foi dentro do menu lateral
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !sideMenuButton.contains(e.target)) {
        sideMenu.style.display = 'none';
    }
});


menuProfileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    menuExitButton.style.display = menuExitButton.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (!menuExitButton.contains(e.target)) {
        menuExitButton.style.display  = 'none';
    }
});