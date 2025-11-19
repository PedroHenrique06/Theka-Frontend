import { getAccessToken, refreshAccessToken } from "./userApi.js";

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
    const token = getAccessToken();
    try {
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${API_BASE_URL}/livros/`, options);

        if(!response.ok) {
            if(response.status === 401) {
                try{
                    const accessToken = await refreshAccessToken();
                    if (accessToken){
                        try{
                            await postBook(id);
                        }
                        catch(error){
                            console.error('Token de acesso inválido.');
                        }
                    }
                    else {
                        alert('Falha na operação de cadastrar livro.');
                    }
                }
                catch(error){
                    console.error('Erro na requisição da renovação de token.');
                }
            }
            else {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
        }

        const responseData = await response.json();
        
        return responseData;
    }
    catch (error) {
        console.error('Houve um problema com a operação POST:', error);
        throw error;
    }
}

// Função para modificar/atualizar as informações de um livro
export async function putBookData(data, id) {
    const token = getAccessToken();
    try {
        const options = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(`${API_BASE_URL}/livros/${id}/`, options);

        if(!response.ok) {
            if(response.status === 401) {
                try{
                    const accessToken = await refreshAccessToken();
                    if (accessToken){
                        try{
                            await putBookData(data, id);
                        }
                        catch(error){
                            console.error('Token de acesso inválido.');
                        }
                    }
                    else {
                        alert("Falha na operação de atualização de livro.");
                    }
                }
                catch(error){
                    console.error('Erro na requisição da renovação de token.');
                }
            }
            else {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
        }
    }
    catch(error) {
        console.error('Houve um problema com a operação PUT:', error);
        throw error;
    }
}

// Função para apagar o livro da base de dados
export async function deleteBookById(id){
    const token = getAccessToken();
    try {
        const options = { 
            method: 'DELETE',
            'Authorization': `Bearer ${token}`
        }

        const response = await fetch(`${API_BASE_URL}/livros/${id}/`, options);

        if(!response.ok) {
            if(response.status === 401) {
                try{
                    const accessToken = await refreshAccessToken();
                    if (accessToken){
                        try{
                            await deleteBook(id);
                        }
                        catch(error){
                            console.error('Token de acesso inválido.');
                        }
                    }
                    else {
                        alert('Falha na operação de deleção de livro.');
                    }
                }
                catch(error){
                    console.error('Erro na requisição da renovação de token.');
                }
            }
            else {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
        }

        return true;
    }
    catch(error) {
        console.error('Houve um problema com a operação DELETE:', error);
        throw error;
    }
}