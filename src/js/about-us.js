
const acessForAll = document.getElementById('acess-for-all');
let showingTextAcessContainer = false;
const loveForLiterature = document.getElementById('love-for-literature');
let showingTextLoveContainer = false;
const communityAndExchange = document.getElementById('community-and-exchange');
let showingTextCommunityContainer = false;

// Função para alterar o conteúdo do container 'acesso para todos'
acessForAll.addEventListener('click', () => {
    if(!showingTextAcessContainer) {
        acessForAll.dataset.original = acessForAll.innerHTML;
        acessForAll.innerHTML = `<p> Acreditamos que o conhecimento deve ser compartilhado. Nossa biblioteca é aberta e inclusiva, um espaço onde todos podem aprender, descobrir e se sentir bem-vindos. </p>`;
    }
    else {
        acessForAll.innerHTML = acessForAll.dataset.original;
    }

    showingTextAcessContainer = !showingTextAcessContainer;
});

// Função para alterar o conteúdo do container 'amor pela literatura'
loveForLiterature.addEventListener('click', () => {
    if(!showingTextLoveContainer) {
        loveForLiterature.dataset.original = loveForLiterature.innerHTML;
        loveForLiterature.innerHTML = `<p> Mais do que livros, cultivamos experiências. Valorizamos a leitura como ferramenta de inspiração, crescimento e transformação. </p>`;
    }
    else {
        loveForLiterature.innerHTML = loveForLiterature.dataset.original;
    }

    showingTextLoveContainer = !showingTextLoveContainer;
});

// Função para alterar o conteúdo do container 'comunidade e troca'
communityAndExchange.addEventListener('click', () => {
    if(!showingTextCommunityContainer) {
        communityAndExchange.dataset.original = communityAndExchange.innerHTML;
        communityAndExchange.innerHTML = `<p> Somos mais que estantes: somos um ponto de encontro. Aqui, cada pessoa pode aprender, ensinar e construir junto uma rede de saberes e culturas. </p>`;
    }
    else {
        communityAndExchange.innerHTML = communityAndExchange.dataset.original;
    }

    showingTextCommunityContainer = !showingTextCommunityContainer;
});