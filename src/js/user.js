import { getUsers, postUserData, validadeUser } from "./userApi.js";

const signupContainer = document.getElementById('signup-container');
let saveButton = "";

const loginContainer = document.getElementById('login-container');
let enterButton = "";


if (signupContainer) {
    saveButton = signupContainer.querySelector('.save-button');
}

if (saveButton) {
    saveButton.onclick=registerUser;
}

if (loginContainer) {
    enterButton = loginContainer.querySelector('.enter-button');
}

if (enterButton) {
    enterButton.onclick=login;
}

// Função para cadastrar um novo usuário
async function registerUser() {
    const name = signupContainer.querySelector('#name').value.trim();
    const email = signupContainer.querySelector('#email').value.trim(); 
    const password = signupContainer.querySelector('#password').value;
    const passwordConfirmation = signupContainer.querySelector('#confirmation').value;

    try {
        const users = await getUsers();
        users.forEach(user => {
            if (user.email === email) {
                throw new Error('O e-mail indicado já se encontra cadastrado no sistema.');
                return;
            }
        });
    } 
    catch (error) {
        throw new Error('Falha ao acessar as informações do usuário na API.');
    }

    if (password !== passwordConfirmation) {
        throw new Error("As senhas digitadas não coincidem.");
        return;
    }

    const userData = {
        "username": email,
        "email": email,
        "password": password,
        "password_confirm": password
    }

    try {
        const result = await postUserData(userData);
        console.log("result:", result);
    }
    catch(error) {
        throw new Error("Falha ao realizar o cadastro dos dados do usuário.");
    }
}

// Função para realizar o login do usuário
async function login() {
    const email = loginContainer.querySelector('#email').value.trim();
    const password = loginContainer.querySelector('#password').value;

    const credentials = {
        "username": email,
        "password": password 
    }

    try {
        const result =  await validadeUser(credentials);
        console.log("Login realizado com sucesso.");
    }
    catch(error){
        console.error("Falha ao realizar o login do usuário:", error);
    }
}

