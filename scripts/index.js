import Navbar from "../components/shared/Navbar.js";
import Header from "../components/shared/Header.js";
import Filter from "../components/homePage/Filter.js";
import {Maincharacters, queryCharacters , randomCharacter,filteredCharacters} from '../data/characters.js'
Filter()
Navbar()
Header()
//Getting URL from Header js + Pagination function & Filter Js
const getURL = new URL(window.location.href);
//Getting searchParam from URL above
const isSearch = getURL.searchParams.get('search');
const isFilter = getURL.searchParams.get('filter');
const keyword = getURL.searchParams.get('name');
// Base API urls
const APIurl = 'https://rickandmortyapi.com/api/character/?';
document.addEventListener('DOMContentLoaded', async()=>{
    // toggleTheme func Does not Work if we call it while DOM content is Loading, still do not know why tho
    await randomCharacter(APIurl)
    let name = keyword ? keyword : '';
    // Rendering Filtered Characters
    isFilter ? await filteredCharacters(`${APIurl}${getURL.searchParams.toString()}`,name) :
    // Rendering Searched Characters
    isSearch ? await queryCharacters(`${APIurl}${getURL.searchParams.toString()}`,name) : 
    // Rendering Main Characters
    await Maincharacters(`${APIurl}${getURL.searchParams.toString()}`);
});
