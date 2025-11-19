
const API_BASE_URL = "https://thekaapi.pythonanywhere.com";

// Função para buscar a lista de usuários cadastrados
export async function getUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users/`);

        if (!response.ok) {
             throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
        }

        return await response.json(); 
    } 
    catch (error) {
        throw Error("Falha ao buscar lista de usuários cadastrados.");
    }
}

// Função para enviar os dados do usuário cadastrado
export async function postUserData(data) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${API_BASE_URL}/users/`, options);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        return responseData;
    }
    catch (error) {
        console.error('Houve um problema com a operação POST:', error);
        throw error;
    }
}

// Função para validar o login do usuário
export async function validadeUser(credentials){
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }
    try{
        const response = await fetch(`${API_BASE_URL}/auth/token/`, options);
        
        if (!response.ok) {
            if (response.status === 401){
                throw new Error();
            }
            else {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
        }
    
        const data = await response.json();
        const token = data.access;
        const refresh = data.refresh;

        sessionStorage.setItem('AuthToken', token);
        sessionStorage.setItem('AuthRefresh', refresh);
    }
    catch (error) {
        console.error('Houve um problema com a validação de usuário.');
        throw error;
    }
}

// Função para retornar o token de acesso
export function getToken() {
    return sessionStorage.getItem('AuthToken');
}

// Função para retornar o renovador de token de acesso
export function getRefresh() {
    return sessionStorage.getItem('AuthRefresh');
}