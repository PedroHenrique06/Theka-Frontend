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
    bookCoverContainer.onclick=expandBookCover;
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

    bookInfoContainer.innerHTML= `<h2>${book.titulo}</h2> <span>${book.autor} - ${book.ano_publicacao}</span>`;
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
        createCatalogItem(book.capa);
    });
}

// Função para criar os elementos do catálogo dinamicamente
function createCatalogItem(bookCover) {
    const bookCoverContainer = document.createElement('div');
    bookCoverContainer.classList.add('book-cover');
    bookCoverContainer.onclick=changeDisplayStateModal;

    const bookCoverImg = document.createElement('img');
    bookCoverImg.src = bookCover;

    bookCoverContainer.appendChild(bookCoverImg);

    catalog.appendChild(bookCoverContainer);
}

function changeDisplayStateModal(event) {
    event.stopPropagation();
    const modal = document.getElementById('modal-edit');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

document.addEventListener('click', (event) => {
    const modal = document.getElementById('modal-edit');  

    if (!modal.contains(event.target)){
        modal.style.display = 'none';
    }
});

loadCatalogBooks();
loadCarousel();

