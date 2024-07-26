export default function PaginationNav(pageLength) {
    // Pagination Container
    const PaginationNavContainer = document.getElementById('paginationNav');

    // URL class to get page Param
    const getURL = new URL(window.location.href);
    const paginationPage = getURL.searchParams.get('page');
    
    // Defining Page number
    const pageNumber = paginationPage ? Number(paginationPage) : 1;

    // Defining window size for pagination
    const windowSize = 5;
    let startPage = Math.max(1, pageNumber - Math.floor(windowSize / 2));
    let endPage = Math.min(pageLength, pageNumber + Math.floor(windowSize / 2));

    if (endPage - startPage + 1 < windowSize) {
        if (startPage === 1) {
            endPage = Math.min(pageLength, startPage + windowSize - 1);
        } else {
            startPage = Math.max(1, endPage - windowSize + 1);
        }
    }

    // Accumulator for pagination buttons
    let accumulatorHTML = '';
    if (startPage > 1) {
        accumulatorHTML += `<li><button data-btn-id="1" id="paginationBtn">1</button></li>`;
        if (startPage > 2) {
            accumulatorHTML += `<li><span>...</span></li>`;
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        const isActive = pageNumber === i ? 'active' : '';
        accumulatorHTML += `
        <li><button data-btn-id="${i}" id="paginationBtn" class="${isActive}">${i}</button></li>`;
    }
    if (endPage < pageLength) {
        if (endPage < pageLength - 1) {
            accumulatorHTML += `<li><span>...</span></li>`;
        }
        accumulatorHTML += `<li><button data-btn-id="${pageLength}" id="paginationBtn">${pageLength}</button></li>`;
    }

    // If Total Pages is 1 do nothing, else inject buttons for each page
    if (pageLength !== 1) {
        PaginationNavContainer.innerHTML = `
        <ul>
            <li><button id="paginationBtnPrev">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="m12.707 7.707-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z"></path>
                    <path d="M16.293 6.293 10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z"></path>
                </svg>
            </button></li>
            ${accumulatorHTML}
            <li><button id="paginationBtnNext">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"></path>
                    <path d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"></path>
                </svg>
            </button></li>
        </ul>`;
    }

    // Checking if we do have search param then delete 'page' param
    if (getURL.searchParams.toString().includes('search')) getURL.searchParams.delete('page');
    let isSearch = getURL.searchParams.toString().includes('search') ? '&' + getURL.searchParams.toString() : '';

    // Checking if we do have filter param then delete 'page' param
    if (getURL.searchParams.toString().includes('filter')) getURL.searchParams.delete('page');
    let isFilter = getURL.searchParams.toString().includes('filter') ? '&' + getURL.searchParams.toString() : '';

    // Pagination buttons
    const paginationBtns = document.querySelectorAll('#paginationBtn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const { btnId } = btn.dataset;
            window.location.href = `index.html?page=${btnId}${isFilter}${isSearch}`;
        });
    });

    // Defining Prev/Next buttons
    const btnPrev = document.getElementById('paginationBtnPrev');
    const btnNext = document.getElementById('paginationBtnNext');

    // Making Prev/Next button interactive
    btnPrev?.addEventListener('click', () => {
        pageNumber - 1 <= 0 || !pageNumber? btnPrev.disabled = true: window.location.href = `index.html?page=${pageNumber - 1}${isFilter}${isSearch}`;
    });
    btnNext?.addEventListener('click', () => {
        pageNumber + 1 <= pageLength ? window.location.href = `index.html?page=${pageNumber + 1}${isFilter}${isSearch}`: btnNext.disabled = true;
    });
    if(pageNumber - 1 <= 0) btnPrev?.remove();
    if(pageNumber + 1 > pageLength) btnNext?.remove();
}
