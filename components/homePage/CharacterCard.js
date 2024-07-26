export default function CharacterCard(character){
    const statusColor = character.status === 'Dead' ? 'color-dead' : character.status === 'Alive' ? 'color-alive' : character.status === 'unknown' ? 'color-unkown' : '';
    const characterStatus = character.status === 'unknown' ? character.status = 'Unknown' : character.status ;
    return `
    <div class="character-card js-character-card-${character.id}">
        <div class="character-image-container">
            <img src="${character.image}" alt="${character.name}" loading="lazy">
        </div>
        <div class="character-info">
            <h2 class="limit-text-to-1-lines">${character.name}</h2>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" class="${statusColor}"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg> 
                <p class="limit-text-to-1-lines">${characterStatus} - ${character.species} </p>
            </div>
        </div>
        <div  class="add-favorite-container ">
            <div class="added-msg added-msg-${character.id}"></div>
            <button data-card-id="${character.id}" class="add-to-favorite-btn" >Add to Favorite</button>
        <div>
    </div>
    `
}