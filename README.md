# Theka-Frontend 📚🌐
# 📚 Theka – Sistema de Biblioteca Online

Theka é um projeto de frontend desenvolvido como parte do desafio Trainee da EJECT e tem como objetivo criar uma plataforma web moderna para o gerenciamento da biblioteca Theka.
O sistema oferece interfaces para usuários navegarem pelo catálogo, visualizarem detalhes, interagirem com um carrossel dinâmico de recomendações e realizarem login e cadastro.

---

## 🚀 Tecnologias Utilizadas

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**

### API

Integração com uma API externa que fornece:

* Listagem de livros (`GET`)
* Cadastro de livros (`POST`)
* Edição de informações (`PUT`)
* Exclusão de livros (`DELETE`)
* Cadastro de usuário (`POST`)
* Autenticação JWT

---

## 🎯 Funcionalidades

### 👤 Autenticação

* Cadastro de usuário
* Login com e-mail e senha
* Geração e armazenamento de token JWT
* Requisições autenticadas com `Authorization: Bearer <token>`

### 📖 Catálogo de Livros

* Listagem completa de títulos vindos da API
* Exibição dinâmica dos livros
* Cada livro pode ser selecionado para abrir detalhes em um modal

### 📚 Carrossel de Destaques

* Carrossel dinâmico
* Ícone de seta acompanha a animação
* Ao clicar em um livro, as informações e o destaque são atualizados

--- 

## 🛠 Como Executar o Projeto

### 1️⃣ Clonar o repositório

```
git clone https://github.com/seu-repo/theka.git
```

### 2️⃣ Abrir o projeto

Basta abrir o `index.html` no navegador.

Caso use módulos ES6 (`type="module"`), é recomendado subir um servidor local:

#### Usando o VSCode

```
Live Server → Go Live
```
---

## 📌 Melhorias futuras

* Implementação de responsividade total
* Melhoria nas transições de estilo 

---

## 🧑‍💻 Desenvolvido por

Pedro Henrique Sales dos Santos

---

README criado automaticamente com base no contexto do projeto, podendo ser ajustado ou expandido conforme necessário.
