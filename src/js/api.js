
const API_BASE_URL = "https://thekaapi.pythonanywhere.com";

// Função para buscar as informações dos livros no repositório
export async function getBooks() {
    try{
        const response = await fetch(`${API_BASE_URL}/livros/`);
        return await response.json(); 
    }
    catch(error) {
        throw Error("Falha ao acessar a lista de livros do catálogo.");
    }
}

// Função para buscar os livros da sessão 'novidades da semana'
export async function getBookWeekNews() {
    try {
        const response = await fetch(`${API_BASE_URL}/livros/novidades/`);
        return await response.json();
    }
    catch(error) {
        throw Error("Falha ao acessar as novidades da semana.");
    }
}

// Função para buscar um livro pelo id
export async function getBookById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/livros/${id}/`);
        return await response.json();
    }
    catch(error) {
        throw Error("Falha ao buscar o livro pelo id.");
    }
}

// Função para buscar os contatos do rodapé
export async function getInstituicionalContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/institucional/contato/`);
        return await response.json();
    }
    catch(error) {
        throw Error("Falha ao buscar os dados de contatos.");
    }
}