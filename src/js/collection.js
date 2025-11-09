
const books = document.querySelectorAll('.book-cover-container');

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
    
}