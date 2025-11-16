import { getBooks, getBookWeekNews } from "./api.js";

const carousel = document.getElementById('carousel-container');
let isRotated = false;
let isActive = false;

const catalog = document.getElementById('book-rows-container');

const pages = document.querySelectorAll('.pagination-item');
const modal = document.getElementById('modal-edit');

// Função para carregar os livros do carrossel
async function loadCarousel() {
    const bookWeekNews = await getBookWeekNews();
    bookWeekNews.forEach(book => {
        createCarouselItem(book.capa);
    });
    isRotated = !isRotated;
    isActive = !isActive;
}

// Função para criar os elementos da sessão 'novidades da semana' dinamicamente.
function createCarouselItem(bookCover) {
    const bookCoverContainer = document.createElement('div');
    bookCoverContainer.classList.add('book-cover-container');
    bookCoverContainer.onclick=expandBookCover;
    
    if (!isActive) {
        bookCoverContainer.classList.add('active');
        isActive = true;
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
    books.forEach(book => { 
        book.classList.remove('active'); 
    });

    clicked.classList.add('active');
    const arrow = clicked.querySelector('.arrow-icon');

    rotateCurrentArrow(arrow); 
}

// Função para girar o ícone da seta
function rotateCurrentArrow(choosenArrow) {
    const arrows = document.querySelectorAll('.arrow-icon');
    arrows.forEach(arrow => {
        arrow.classList.remove('rotated');
    });

    choosenArrow.classList.add('rotated');
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

// VAI SER ESTUDADO PARA SER RESOLVIDO O PROBLEMA.

// books = document.querySelectorAll('.book-cover');

// // Ainda não funciona 
// books.forEach(book => {
//     book.addEventListener('click', (e) => {
//         e.stopPropagation();
//         modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
//     });
// });

// document.addEventListener('click', (e) => {
//     if (!modal.contains(e.target)) {
//         modal.style.display = 'none';
//     } 
// });

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

    const bookCoverImg = document.createElement('img');
    bookCoverImg.src = bookCover;

    bookCoverContainer.appendChild(bookCoverImg);

    catalog.appendChild(bookCoverContainer);
}

loadCatalogBooks();
loadCarousel();

