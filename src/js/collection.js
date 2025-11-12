
const books = document.querySelectorAll('.book-cover-container');
const pages = document.querySelectorAll('.pagination-item');
const modal = document.getElementById('modal-edit');
const arrows = document.querySelectorAll('.arrow-icon');

// Adiciona a função de expandir capa a todos os items do carrossel
books.forEach(book => {
    book.addEventListener('click', expandBookCover);
});

// Função para expandir a capa do livro selecionada
function expandBookCover(choosenBook) {
    books.forEach(book => {
        if (book.classList.contains('active')) {
            book.classList.remove('active');
        }
    });

    choosenBook.currentTarget.classList.add('active');
    const arrow = choosenBook.currentTarget.querySelector('.arrow-icon');

    rotateCurrentArrow(arrow); 
}

// Função para girar o ícone da seta
function rotateCurrentArrow(choosenArrow) {
    arrows.forEach(arrow => {
        if (arrow.classList.contains('rotated')) {
            arrow.classList.remove('rotated');
        }
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

books = document.querySelectorAll('.book-cover');

// Ainda não funciona 
books.forEach(book => {
    book.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    });
});

document.addEventListener('click', (e) => {
    if (!modal.contains(e.target)) {
        modal.style.display = 'none';
    } 
});
