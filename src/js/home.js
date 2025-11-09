
const books = document.querySelectorAll('.book-item');
// const arrowButtons = document.querySelectorAll('.arrow-icon');

// Adiciona a função de movimentar a pilha de livros a cada capa
books.forEach(book => {
    book.addEventListener('click', rotateBooks);
});

// Muda a ordem dos livros na pilha
function rotateBooks() {
    books.forEach(book => {
        if (book.classList.contains('front')) {
            book.classList.remove('front');
            book.classList.add('back');
        }
        else if (book.classList.contains('middle')) {
            book.classList.remove('middle');
            book.classList.add('front');
        }
        else if (book.classList.contains('back')) {
            book.classList.remove('back');
            book.classList.add('middle');
        }
    });
}