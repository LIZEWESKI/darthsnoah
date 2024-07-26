import myFavoritesCharacters from "../../data/favoritesCharacters.js";
const FavCharacterCard = async (character)=>{
    let {id,image,name,status,species,type,gender,origin,location} = character;
    const statusColor = status === 'Dead' ? 'color-dead' : status === 'Alive' ? 'color-alive' : status === 'unknown' ? 'color-unkown' : '';
    const characterStatus = status === 'unknown' ? status = 'Unknown' : status ; 
    const characterType = type ? type : 'Type unknown';
    const episode = await myFavoritesCharacters.getEpisode(character.id)
    return `
            <div class="wrapper">
            <div class="img-container">
            <button data-character-id="${id}" class="remove-character">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
            </button>
                <img src="${image}" alt="${name}">
            </div>
            <div class="character-info character-id-${id}">
                <h2 class="limit-text-to-1-lines">${name}</h2>
                <small><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" class="${statusColor}"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg> ${characterStatus} - ${gender} </small>
                <p>${species} - ${characterType}</p>
                 <p><strong>Origin: </strong>${origin.name}</p>
                 <p><strong>Location: </strong>${location.name}</p>
                 <p><strong>First seen in:</strong> ${episode.name} - ${episode.episode}</p>
            </div>
        </div>
    `
}
export default FavCharacterCard