import { getUsers, postUserData, validadeUser } from "./userApi.js";

const loginContainer = document.getElementById('login-container');
let enterButton = "";
const signupContainer = document.getElementById('signup-container');
let saveButton = "";
const showPasswordButton = document.getElementById('show-password');

// Garante que o elemento existe antes de associar uma função a ele
if (loginContainer) {
    enterButton = loginContainer.querySelector('.enter-button');
}
if (enterButton) {
    enterButton.onclick=login;
}
if (signupContainer) {
    saveButton = signupContainer.querySelector('.save-button');
}
if (saveButton) {
    saveButton.onclick=registerUser;
}

if (showPasswordButton) {
    showPasswordButton.onclick=showPassword;
}

// Função para visualizar senha
function showPassword(){
    const passwordInput = document.getElementById('password');
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password'
}

// Função para realizar o login do usuário
async function login() {
    const email = loginContainer.querySelector('#email').value.trim();;
    const password = loginContainer.querySelector('#password').value;

    const credentials = {
        "username": email,
        "password": password 
    }

    try {
        await validadeUser(credentials);
        console.log("Login realizado com sucesso.");
        window.location.href="./home.html";
    }
    catch(error){
        alert('E-mail ou senha incorretos, tente novamente.');
    }
    finally {
        const form = document.getElementById('login-form');
        form.reset();
    }
}

// Função para cadastrar um novo usuário
async function registerUser() {
    const name = signupContainer.querySelector('#name').value.trim();;
    const email = signupContainer.querySelector('#email').value.trim(); 
    const password = signupContainer.querySelector('#password').value;
    const passwordConfirmation = signupContainer.querySelector('#confirmation').value;

    try {
        const users = await getUsers();
        users.forEach(user => {
            if (user.email === email) {
                alert('O e-mail indicado já se encontra cadastrado no sistema.');
                clearForm(nameContainer, emailContainer, passwordContainer, passwordConfirmationContainer);
                return;
            }
        });
    } 
    catch (error) {
        throw new Error('Falha ao acessar as informações do usuário na API.');
    }

    if (password !== passwordConfirmation) {
        alert("As senhas digitadas não coincidem.");
        clearForm(nameContainer, emailContainer, passwordContainer, passwordConfirmationContainer);
        return;
    }

    const userData = {
        "username": email,
        "email": email,
        "password": password,
        "password_confirm": password
    }

    try {
        await postUserData(userData);
        alert("Usuário cadastrado com sucesso.");
    }
    catch(error) {
        alert('Falha ao realizar o cadastro dos dados do usuário.');
        throw new Error("Falha ao realizar o cadastro dos dados do usuário.");
    }
    finally {
        const form = document.getElementById('signup-form');
        form.reset();
    }
}

