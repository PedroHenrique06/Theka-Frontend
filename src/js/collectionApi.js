
const API_BASE_URL = "https://thekaapi.pythonanywhere.com";

// Função para buscar as informações dos livros no repositório
export async function getBooks() {
    try{
        const response = await fetch(`${API_BASE_URL}/livros/`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        return await response.json(); 
    }
    catch(error) {
        throw Error("Falha ao acessar a lista de livros do catálogo.");
    }
}

// Função para buscar um livro pelo id
export async function getBookById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/livros/${id}/`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }
    catch(error) {
        throw Error("Falha ao buscar o livro pelo id.");
    }
}

// Função para buscar os livros da sessão 'novidades da semana'
export async function getBookWeekNews() {
    try {
        const response = await fetch(`${API_BASE_URL}/livros/novidades/`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }
    catch(error) {
        throw Error("Falha ao acessar as novidades da semana.");
    }
}

// Função para cadastrar um novo livro
export async function postBookData(data) {
    try {
        options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${API_BASE_URL}/livros/`);

        if(!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
    }
    catch (error) {
        console.error('Houve um problema com a operação POST:', error);
        throw error;
    }
}