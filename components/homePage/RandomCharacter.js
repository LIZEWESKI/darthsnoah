export default function RandomCharacterCard(randomCharacter){
    let {id,name,image,gender,status,species,type,origin,location} = randomCharacter;
    const statusColor = status === 'Dead' ? 'color-dead' : status === 'Alive' ? 'color-alive' : status === 'unknown' ? 'color-unkown' : '';
    const characterStatus = status === 'unknown' ? status = 'Unknown' : status ; 
    const characterType = type ? type : 'Type unknown';
    return `
        <h1>Random Character</h1>
        <div class="wrapper">
            <div class="img-container">
                <img src="${image}" alt="${name}">
            </div>
            <div class="character-info character-id-${id}">
                <!-- Name -->
                <h2 class="limit-text-to-1-lines">${name}</h2>
                <!-- Gender and Status -->
                <small><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" class="${statusColor}"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg> ${characterStatus} - ${gender} </small>
                <!-- Specis + Type -->
                <p>${species} - ${characterType}</p>
                <!-- Location, Origin-->
                 <p><strong>Origin: </strong>${origin.name}</p>
                 <p><strong>Location: </strong>${location.name}</p>
            </div>
            <div class="add-favorite-container">
            <div class="added-msg added-msg-${randomCharacter.id}"></div>
              <button data-card-id="${randomCharacter.id}" class="add-random-to-favorite-btn" >Add to Favorite</button>
            </div>
        </div>
        <button id="generateBtn">Generate new Character</button>
    `;
}