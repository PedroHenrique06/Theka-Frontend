const sideMenu = document.getElementById('side-menu');
const sideMenuButton = document.getElementById('side-menu-button');
const menuProfileButton = document.getElementById('profile-icon');
const menuExitButton = document.querySelector('.exit-icon-container');
const cancelButton = document.getElementById('signup-cancel-button');
const backButton = document.getElementById('recovery-back-button');
const exitButton = document.getElementById('exit-icon');

if (exitButton) {
    exitButton.onclick=logout;
 }

function logout(){
    alert('Encerrando sessão...');
    localStorage.clear();
    window.location.href='./login.html';
}

// Associação de botões a funções
document.addEventListener('DOMContentLoaded', () => {
    if (cancelButton){
        cancelButton.onclick=goBackToLogin;
    }
    if(backButton) {
        backButton.onclick=goBackToLogin;
    }
})

// Função para voltar para a tela de login
function goBackToLogin() {
    window.location.href='./login.html';
}

if(sideMenuButton) {
    // Abre o menu lateral
    sideMenuButton.addEventListener('click', () => {
        sideMenu.style.display = sideMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

if(menuProfileButton) {
    // Abre o container do botão de sair
    menuProfileButton.addEventListener('click', (event) => {
        event.stopPropagation();
        menuExitButton.style.display = menuExitButton.style.display === 'block' ? 'none' : 'block';
    });
}

if(sideMenu && sideMenuButton && menuExitButton) {
    // Verifica se o clique foi dentro do container escolhido
    document.addEventListener('click', (event) => {
        if (!sideMenu.contains(event.target) && !sideMenuButton.contains(event.target)) {
            sideMenu.style.display = 'none';
        }
        if (!menuExitButton.contains(event.target)) {
            menuExitButton.style.display  = 'none';
        }  
    });
}

