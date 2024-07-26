class FavoriteCharacters {
    cardsFavorites;
    localStorageKey;
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey
        this.loadFavCards()
    }
    loadFavCards(){
        this.cardsFavorites = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
    }
    async addToFav(characterId){
        this.cardsFavorites.find(character => character.id === characterId) ?console.log('this Character already Exist') : await this.pushCharacter(characterId)
    }
    saveFavCards(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cardsFavorites))
    }
    async pushCharacter(characterId){
        const APIurl = `https://rickandmortyapi.com/api/character/${characterId}`
        const res = await fetch(APIurl);
        const characterData = await res.json();
        this.cardsFavorites.unshift(characterData)
        this.saveFavCards()
    }
    
    async getEpisode(characterId){
        const character = this.cardsFavorites.find(character => character.id === characterId);
        const res = await fetch(character.episode[0])
        const episodeData = await res.json();        
        return episodeData
    }
    removeCharacter(characterId){
        const newCardsFavorites = this.cardsFavorites.filter(character => character.id !== characterId )
        this.cardsFavorites = newCardsFavorites;
        this.saveFavCards()
    }
}
 const myFavoritesCharacters = new FavoriteCharacters('oop-fav-characters')
 export default myFavoritesCharacters