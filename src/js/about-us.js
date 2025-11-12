
const acessForAll = document.getElementById('acess-for-all');
let showingTextAcessContainer = false;
const loveForLiterature = document.getElementById('love-for-literature');
let showingTextLoveContainer = false;
const communityAndExchange = document.getElementById('community-and-exchange');
let showingTextCommunityContainer = false;

acessForAll.addEventListener('click', () => {
    if(!showingTextAcessContainer) {
        acessForAll.dataset.original = acessForAll.innerHTML;
        acessForAll.innerHTML = `<p> Lorem Impsun Lorem Impsun Lorem Impsun Lorem Impsun </p>`;
    }
    else {
        acessForAll.innerHTML = acessForAll.dataset.original;
    }

    showingTextAcessContainer = !showingTextAcessContainer;
    console.log(acessForAll.innerHTML);
});