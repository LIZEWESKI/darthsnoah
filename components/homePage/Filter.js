import { filterOptions, getFilter } from "../../data/filterOptions.js";

// Generate filter HTML
const generateFilterHTML = () => {
    return filterOptions.map(filter => {
        const optionHTML = filter.options.map(option => `<li>${option}</li>`).join('');
        return `
            <div class="filter-buttons-container js-filter-buttons-container-${filter.id}">
                <button data-filter-id="${filter.id}" class="filter-button">
                    <span class="js-filter-value-${filter.id} filter${filter.value}">${filter.value}</span>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                        </svg>
                    </div>
                </button>
                <div class="options-container">
                    <ul data-filter-id="${filter.id}" class="options js-options js-options-${filter.id}">
                        <li>None</li>
                        ${optionHTML}
                    </ul>
                </div>
            </div>`;
    }).join('');
};

// Render filter section
const renderFilterSection = () => {
    const filterSection = document.querySelector('#filterSection');
    filterSection.innerHTML = `
        <h1>Filter</h1>
        <small>For best results, use simple and fewer filters.</small>
        <div class="filter-container">
            <input type="search" id="queryInput" placeholder="Search by name">
            ${generateFilterHTML()}
            <button id="submitFilter">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1.001 1.001 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1zm-6.707 9.293A.996.996 0 0 0 14 13v5.382l-2 1V13a.996.996 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583-5.71 5.71z"></path>
                    </svg>
                </div>
                <span>Filter</span>
            </button>
        </div>`;
};

// Initialize filter event listeners
const initializeEventListeners = () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const filterContainers = document.querySelectorAll('.filter-buttons-container');
    const optionsUls = document.querySelectorAll('.js-options');
    const submitFilterButton = document.getElementById('submitFilter');
    const searchInput = document.getElementById('queryInput');
    const filterStatus = document.querySelector('.filterStatus');
    const filterGender = document.querySelector('.filterGender');
    const filterSpecies = document.querySelector('.filterSpecies');

    // Toggle filter container
    const toggleFilterContainer = (filterId) => {
        const filterContainer = document.querySelector(`.js-filter-buttons-container-${filterId}`);
        const isActive = filterContainer.classList.contains('active');
        filterContainers.forEach(container => container.classList.remove('active'));
        if (!isActive) {
            filterContainer.classList.add('active');
        }
    };

    filterButtons.forEach(button => {
        const { filterId } = button.dataset;
        button.addEventListener('click', () => toggleFilterContainer(filterId));
    });

    // Handle option click
    optionsUls.forEach(optionUl => {
        const { filterId } = optionUl.dataset;
        const filter = getFilter(filterId);
        const filterValue = document.querySelector(`.js-filter-value-${filterId}`);
        const filterContainer = document.querySelector(`.js-filter-buttons-container-${filterId}`);
        optionUl.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                filterValue.innerText = e.target.innerText === 'None' ? filter.value : e.target.innerText;
                filterContainer.classList.remove('active');
            }
        });
    });

    // Submit filter
    submitFilterButton.addEventListener('click', () => {
        const searchInputValue = searchInput.value.trim();
        const filterStatusValue = filterStatus.innerText.toLowerCase();
        const filterGenderValue = filterGender.innerText.toLowerCase();
        const filterSpeciesValue = filterSpecies.innerText.toLowerCase();
        const params = new URLSearchParams();
        params.append('filter', 'true');
        let hasFilters = false;
        if (searchInputValue) {
            params.append('name', searchInputValue);
            hasFilters = true;
        }
        if (filterStatusValue !== 'status') {
            params.append('status', filterStatusValue);
            hasFilters = true;
        }
        if (filterGenderValue !== 'gender') {
            params.append('gender', filterGenderValue);
            hasFilters = true;
        }
        if (filterSpeciesValue !== 'species') {
            params.append('species', filterSpeciesValue);
            hasFilters = true;
        }
        window.location.href = `index.html${hasFilters ? `?${params.toString()}` : ''}`;
    });
};

// Initialize filter
const initFilter = () => {
    renderFilterSection();
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
};

export default initFilter;
