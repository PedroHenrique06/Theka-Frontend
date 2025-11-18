import { getUsers, postUserData } from "./api.js";

const signupContainer = document.getElementById('signup-container');
const saveButton = signupContainer.querySelector('.save-button');

saveButton.onclick=registerUser;

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

