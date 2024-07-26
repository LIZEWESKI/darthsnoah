import Navbar from "../components/shared/Navbar.js";
import Header from "../components/shared/Header.js";
import myFavoritesCharacters from "../data/favoritesCharacters.js";
import FavCharacterCard from "../components/favorites/FavCharacterCard.js"
Navbar()
Header()
const favCharactersGrid = document.querySelector('.js-characters-grid')
const emptyCardsContainer = document.querySelector('.empty-fav-card-container')
document.addEventListener('DOMContentLoaded', async ()=>{
    await renderFavCharacters()
});

async function renderFavCharacters(){
    // If fav cards are empty show empty Message otherwise render fav cards
    if(myFavoritesCharacters.cardsFavorites.length === 0){
        emptyCardsContainer.innerHTML = `
        <h2>No favorite characters yet.</h2> 
        <a href="index.html#charactersGrid">Explore character cards here</a>`;
        favCharactersGrid.innerHTML = ''
    }else{
        let accumulatorHTML = '';
        for (const card of myFavoritesCharacters.cardsFavorites) {
            accumulatorHTML += await FavCharacterCard(card);
        }
        favCharactersGrid.innerHTML = accumulatorHTML;
        //Making remove Character buttons interactive
        const removeCharacterBtns = document.querySelectorAll('.remove-character')
        removeCharacterBtns.forEach(button =>{
            button.addEventListener('click',async()=>{
                const {characterId} = button.dataset;
                myFavoritesCharacters.removeCharacter(Number(characterId))
                await renderFavCharacters()
            })
        })
    }
}   