import CharacterCard from '../components/homePage/CharacterCard.js'
import ErrorMessage from '../components/homePage/ErrorMessage.js'
import RandomCharacterCard from '../components/homePage/RandomCharacter.js';
import CharactersCount from '../components/homePage/CharactersCount.js';
import PaginationNav from '../components/homePage/PaginationNav.js';
import myFavoritesCharacters from './favoritesCharacters.js';
// Declaring wanting Elements
const randomSection = document.getElementById('randomSection');
const gridCharacters = document.querySelector('.characters-grid');
const errorMessageEl = document.querySelector('.error-message-container');

// Main Fetch Characters Function
const mainFetchFun = async (APIurl,keyword,isSearch = false,isFilter = false)=>{
    try{
        // Sending an API request for the wanted url
        const res = await fetch(APIurl);
        // Handling Errors by displaying a Message 
        if(!res.ok){
            gridCharacters.innerHTML = ''
            errorMessageEl.innerHTML = ErrorMessage(keyword,isSearch,isFilter)
            return
        }else {
            // Getting the Data from GET request
            const data = await res.json();
            // Declaring data
            const {count,pages} = data.info
            const Characters = data.results;
            gridCharacters.innerHTML = '';
            errorMessageEl.innerHTML = '';
            // Displaying count results from the received Data 
            CharactersCount(count,keyword)
            // Rendering results
            Characters.forEach(character => {
                gridCharacters.innerHTML += CharacterCard(character)
            });
            const addToFavBtn = document.querySelectorAll('.add-to-favorite-btn')
            addToFavBtn.forEach(button =>{
                button.addEventListener('click',()=>{
                    const {cardId} = button.dataset;
                    myFavoritesCharacters.addToFav(Number(cardId))
                    const addMessage = document.querySelector(`.added-msg-${cardId}`)
                    const isCardExist = myFavoritesCharacters.cardsFavorites.find(card => Number(cardId) === card.id)
                    isCardExist ? addMessage.innerHTML = 'Already a favorite!' : addMessage.innerHTML = 'Added to Favorite!'
                    addMessage.classList.add('active')
                    button.disabled = true
                    setTimeout(()=>{
                        addMessage.classList.remove('active')
                        button.disabled = false
                    },1500)
                })
            })
            // Displaying Pagination
            PaginationNav(pages);
        }
    // Catching the Error
    }catch(err){
        console.log(err)
    }
}
// Initialize Characters
export const Maincharacters = async (APIurl,keyword)=>{
    await mainFetchFun(APIurl,keyword,false,false)
}
// Characters by Search
export const queryCharacters = async (APIurl,keyword)=>{
    await mainFetchFun(APIurl,keyword,true,false)
}
//Filtered Characters
export const filteredCharacters = async (APIurl,keyword)=>{
    // if keyword is empty make 'Filtered' as default
    keyword === '' ? keyword = 'Filtered' : '';
    await mainFetchFun(APIurl,keyword,false,true)
}
// Random Character
export const randomCharacter = async()=>{
    // Base Url
    const APIurl = 'https://rickandmortyapi.com/api/character/';
    // Sending a GET request to receive total Ids count
    const res = await fetch(APIurl)
    const data = await res.json();
    // Declaring total Ids count
    const totalCharacters = data.info.count;
    // Defining random Id based on data above
    const randomId = Math.ceil(Math.random() * totalCharacters);
    // Sending a GET request for random Id
    const resRandom = await fetch(APIurl + randomId )
    const dataRandom = await resRandom.json();
    // Render the Random Character
    randomSection.innerHTML = RandomCharacterCard(dataRandom)
    // Make add Favorite Button interactive
    const addToFavBtn = document.querySelector('.add-random-to-favorite-btn')
    addToFavBtn.addEventListener('click',()=>{
        const {cardId} = addToFavBtn.dataset;
        myFavoritesCharacters.addToFav(Number(cardId))
        const addMessage = document.querySelector(`.added-msg-${cardId}`)
            const isCardExist = myFavoritesCharacters.cardsFavorites.find(card => Number(cardId) === card.id)
            isCardExist ? addMessage.innerHTML = 'Already a favorite!' : addMessage.innerHTML = 'Added to Favorite!'
            addMessage.classList.add('active')
            addToFavBtn.disabled = true
            setTimeout(()=>{
                addMessage.classList.remove('active')
                addToFavBtn.disabled = false
            },1500)
    })
    // make Generate Button interactive
    const generateButton = document.getElementById('generateBtn');
    generateButton.addEventListener('click',()=>{
        randomCharacter(APIurl)
    })
}