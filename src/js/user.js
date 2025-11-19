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
    const nameContainer = signupContainer.querySelector('#name');
    const emailContainer = signupContainer.querySelector('#email'); 
    const passwordContainer = signupContainer.querySelector('#password');
    const passwordConfirmationContainer = signupContainer.querySelector('#confirmation');
    const name = nameContainer.value.trim();
    const email = emailContainer.value.trim(); 
    const password = passwordContainer.value;
    const passwordConfirmation = passwordConfirmationContainer.value;

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
        const result = await postUserData(userData);
        console.log("result:", result);
    }
    catch(error) {
        alert('Falha ao realizar o cadastro dos dados do usuário.');
        throw new Error("Falha ao realizar o cadastro dos dados do usuário.");
    }
    finally {
        clearForm(nameContainer, emailContainer, passwordContainer, passwordConfirmationContainer);
    }
}

function clearForm(nameInput, emailInput, passwordInput, passwordConfirmationInput) {
    nameInput.value = "";
    emailInput.value = ""; 
    passwordInput.value = "";
    passwordConfirmationInput.value = "";
}

// Função para realizar o login do usuário
async function login() {
    const emailContainer = loginContainer.querySelector('#email');
    const passwordContainer = loginContainer.querySelector('#password');
    const email = emailContainer.value.trim();
    const password = passwordContainer.value;

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
        emailContainer.value = "";
        passwordContainer.value = "";
    }

}

