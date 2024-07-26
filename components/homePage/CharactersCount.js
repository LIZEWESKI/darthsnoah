export default function CharactersCount(totalCharacters,keyword = 'Rick and Morty'){
    const characterCountEl = document.getElementById('charactersCountContainer');
    const getURL = new URL(window.location.href);
    const paginationPage = getURL.searchParams.get('page');
    const pageNumber = paginationPage ? Number(paginationPage) : 1;
    let lastIndex = 20 * pageNumber;
    const firstIndex = lastIndex - 19;
    lastIndex > totalCharacters ? lastIndex = totalCharacters : '';
    characterCountEl.innerHTML = `
        <h2><span>${keyword}</span> Cards</h2>
        <small>Showing ${firstIndex}-${lastIndex} of <b>${totalCharacters}</b> </small>
    `;
}