import { getBooks, getBookWeekNews, getBookById } from "./api.js";

const carousel = document.getElementById('carousel-container');
let isRotated = false;
let isActive = false;

const catalog = document.getElementById('book-rows-container');
const pages = document.querySelectorAll('.pagination-item');

// Função para carregar os livros do carrossel
async function loadCarousel() {
    const bookWeekNews = await getBookWeekNews();
    bookWeekNews.forEach(book => {
        createCarouselItem(book.capa, book.id, book.titulo, book.autor, book.ano_publicacao);
    });
    isRotated = !isRotated;
    isActive = !isActive;
}

// Função para criar os elementos da sessão 'novidades da semana' dinamicamente.
function createCarouselItem(bookCover, bookId, bookTitle, bookAuthor, bookYear) {
    const bookCoverContainer = document.createElement('div');
    bookCoverContainer.classList.add('book-cover-container');
    bookCoverContainer.onclick = expandBookCover;
    bookCoverContainer.dataset.bookId = bookId;

    if (!isActive) {
        bookCoverContainer.classList.add('active');
        isActive = true;

        const bookInfoContainer = document.querySelector('.book-title-author-container');
        bookInfoContainer.innerHTML = `<h2>${bookTitle}</h2> <span>${bookAuthor} - ${bookYear}</span>`;
    }

    const arrowImg = '../../images/collection/arrow-up-icon-white.png';
    const arrowIcon = document.createElement('img');
    arrowIcon.src = arrowImg;
    arrowIcon.alt = 'Icone de seta';
    arrowIcon.classList.add('arrow-icon');

    if (!isRotated) {
        arrowIcon.classList.add('rotated');
        isRotated = true;
    }

    const bookCoverImg = document.createElement('img');
    bookCoverImg.src = bookCover;
    bookCoverImg.alt = 'Capa do livro';
    bookCoverImg.classList.add('book-cover');

    bookCoverContainer.appendChild(arrowIcon);
    bookCoverContainer.appendChild(bookCoverImg);
    carousel.appendChild(bookCoverContainer);
}


// Função para expandir a capa do livro selecionada
function expandBookCover(event) {
    const books = document.querySelectorAll('.book-cover-container');
    const clicked = event.currentTarget;
    const bookId = clicked.dataset.bookId;

    books.forEach(book => {
        book.classList.remove('active');
    });

    clicked.classList.add('active');

    const arrow = clicked.querySelector('.arrow-icon');
    rotateCurrentArrow(arrow);

    updateBookInfo(bookId);
}

// Função para girar o ícone da seta
function rotateCurrentArrow(choosenArrow) {
    const arrows = document.querySelectorAll('.arrow-icon');
    arrows.forEach(arrow => {
        arrow.classList.remove('rotated');
    });

    choosenArrow.classList.add('rotated');
}

// Função para atualizar os dados mostrados sobre o livro
async function updateBookInfo(id) {
    const bookInfoContainer = document.querySelector('.book-title-author-container');
    const book = await getBookById(id);

    bookInfoContainer.innerHTML = `<h2>${book.titulo}</h2> <span>${book.autor} - ${book.ano_publicacao}</span>`;
}

// Adiciona a função de mudar a página atual a todas as páginas
pages.forEach(page => {
    page.addEventListener('click', changeCurrentPage);
})

// Função para mudar a página atual
function changeCurrentPage(choosenPage) {
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.classList.remove('active');
        }
    });

    choosenPage.currentTarget.classList.add('active');
}

// Função para carregar os livros do catálogo
async function loadCatalogBooks() {
    const booksInfo = await getBooks();
    booksInfo.results.forEach(book => {
        createCatalogItem(book.capa, book.id, book.titulo, book.autor, book.ano_publicacao, book.resumo, book.numero_paginas, book.editora);
    });

    const addBookButton = document.getElementById('add-button-container');
    addBookButton.onclick = changeDisplayStateModalAdd;
}

// Função para criar os elementos do catálogo dinamicamente
function createCatalogItem(bookCover, bookId, bookTitle, bookAuthor, bookYear, bookSummary, bookPages, bookPublisher) {
    const bookCoverContainer = document.createElement('div');
    bookCoverContainer.classList.add('book-cover');
    bookCoverContainer.onclick = changeDisplayStatePreview;

    bookCoverContainer.dataset.bookId = bookId;
    bookCoverContainer.dataset.bookCover = bookCover;
    bookCoverContainer.dataset.bookTitle = bookTitle;
    bookCoverContainer.dataset.bookAuthor = bookAuthor;
    bookCoverContainer.dataset.bookYear = bookYear;
    bookCoverContainer.dataset.bookSummary = bookSummary;
    bookCoverContainer.dataset.bookPages = bookPages;
    bookCoverContainer.dataset.bookPublisher = bookPublisher;

    const bookCoverImg = document.createElement('img');
    bookCoverImg.src = bookCover;

    bookCoverContainer.appendChild(bookCoverImg);

    catalog.appendChild(bookCoverContainer);
}

// Função por abrir e fechar o modal de preview 
function changeDisplayStatePreview(event) {
    event.stopPropagation();
    const overlay = document.getElementById('overlay-preview-container');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';

    fillPreviewModalData(event.currentTarget.dataset);
}

// Função para preencher os dados do livro dentro do modal de preview
function fillPreviewModalData(bookData) {
    const bookPreviewContainer = document.getElementById('book-preview-container');
    const bookCoverImg = document.querySelector('.book-cover-preview img');
    const bookTitle = document.querySelector('.title-preview');
    const bookAuthorYear = document.querySelector('.author-year-preview');
    const bookSummary = document.querySelector('.resume-preview');
    const bookPages = document.querySelector('.pages');
    const bookPublisher = document.querySelector('.publisher');
    const editButton = document.getElementById('edit-button-preview');
    const closeButton = document.getElementById('close-button-container');

    bookPreviewContainer.dataset.bookId = bookData.bookId;
    bookCoverImg.src = bookData.bookCover;
    bookTitle.textContent = bookData.bookTitle;
    bookAuthorYear.textContent = `${bookData.bookAuthor} - ${bookData.bookYear}`;
    bookSummary.textContent = bookData.bookSummary;
    bookPages.textContent = `páginas: ${bookData.bookPages}`;
    bookPublisher.textContent = `${bookData.bookPublisher}`;
    editButton.onclick = changeDisplayStateModalEdit;
    closeButton.onclick = closePreviewModal;
}

// Função por abrir e fechar o modal de adicionar livro
function changeDisplayStateModalAdd(event) {
    event.stopPropagation();
    const overlay = document.getElementById('overlay-modal-add');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Função por abrir e fechar o modal de editar livro
function changeDisplayStateModalEdit(event) {
    event.stopPropagation();
    const overlay = document.getElementById('overlay-modal-edit');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';


    const bookId = event.currentTarget.parentElement.parentElement.dataset.bookId;
    fillEditModalData(bookId);
}

// Função para preencher os dados do livro dentro do modal de edição
async function fillEditModalData(bookId) {
    const book = await getBookById(bookId);
    const editModal = document.getElementById('modal-edit');
    const bookCover = editModal.querySelector('.book-cover');
    const titleInput = editModal.querySelector('.title-container input');
    const pagesInput = editModal.querySelector('.pages-container input');
    const ISBNInput = editModal.querySelector('.code-container input');
    const authorInput = editModal.querySelector('.author-container input');
    const yearInput = editModal.querySelector('.year-container input');
    const publisherInput = editModal.querySelector('.publisher-container input');
    const summaryInput = editModal.querySelector('.resume-container textarea');

    bookCover.src = book.capa;
    titleInput.value = book.titulo;
    pagesInput.value = book.numero_paginas;
    ISBNInput.value = book.isbn;
    authorInput.value = book.autor;
    yearInput.value = book.ano_publicacao;
    publisherInput.value = book.editora;
    summaryInput.value = book.resumo;
}

// Função para fechar o modal de preview
function closePreviewModal(event) {
    event.stopPropagation();
    const overlay = document.getElementById('overlay-preview-container');
    overlay.style.display = 'none';
}

// Função por fechar os modais ao clicar fora deles
document.addEventListener('click', (event) => {
    const overlayAdd = document.getElementById('overlay-modal-add');
    const modalAdd = document.getElementById('modal-add');
    const overlayEdit = document.getElementById('overlay-modal-edit');
    const modalEdit = document.getElementById('modal-edit');
    const overlayPreview = document.getElementById('overlay-preview-container');
    const modalPreview = document.getElementById('book-preview-container');

    if (overlayPreview.style.display === 'flex' && !modalPreview.contains(event.target)) {
        overlayPreview.style.display = 'none';
    }
    if (overlayEdit.style.display === 'flex' && !modalEdit.contains(event.target)) {
        overlayEdit.style.display = 'none';
    }
    if (overlayAdd.style.display === 'flex' && !modalAdd.contains(event.target)) {
        overlayAdd.style.display = 'none';
    }
});

loadCatalogBooks();
loadCarousel();

