export default function Navbar(){
    const getYear = new Date().getFullYear();
    const homeNav = document.getElementById('nav')
    homeNav.innerHTML =  `
        <div class="up-side">
            <div class="toggle-container">
                <button class="nav-toggle-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M18 6h2v12h-2zm-2 5H7.414l4.293-4.293-1.414-1.414L3.586 12l6.707 6.707 1.414-1.414L7.414 13H16z"></path></svg>
                </button> 
            </div>
            <ul>
                <a href="index.html">
                    <li>
                        <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path></svg></div>
                        <h3 class="link-description">Home</h3>
                    </li>
                </a>
                <a href="favorites.html">
                    <li>
                        <div class="link-fav-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
                        </div>
                        <h3 class="link-description">Favorites</h3>
                    </li>
                </a>
            </ul>
        </div>
        <footer>
            <ul>
                <li><a href="about.html">About & Copyright</a></li>
            </ul>
            <div class="copyright-text">
                \u00A9 ${getYear} Carths Noah
            </div>
        </footer>
    `;
// Defining Nav bar Elements
const navButton = document.querySelector('.nav-toggle-button')
const showNav = document.getElementById('showNav')
// Show/Hide Navbar
navButton.addEventListener('click',()=>{
    homeNav.classList.toggle('isToggled')
})
showNav.addEventListener('click',()=>{
    homeNav.classList.toggle('show-nav')
});
};
