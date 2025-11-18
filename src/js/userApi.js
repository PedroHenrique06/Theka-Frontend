
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