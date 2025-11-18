const books = document.querySelectorAll('.book-item');
const buttonGoToCollection = document.querySelector('.collection-button-container button');
const buttonGoToCompleteCollection = document.querySelector('.complete-collection-container button');

// Adiciona a função de ir à página de acervo aos botões
buttonGoToCollection.onclick = goToCollectionPage;
buttonGoToCompleteCollection.onclick = goToCollectionPage;

// Adiciona a função de movimentar a pilha de livros a cada capa
books.forEach(book => {
    book.addEventListener('click', rotateBooks);
});

// Função para mudar a ordem dos livros na pilha
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

// Função do botão para ir à página de acervo
function goToCollectionPage() {
    window.location.href = './collection.html';
} 

