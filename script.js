const table = document.getElementById('periodic-table');

/**
 * 1. Initialize the Table
 * Fetches data and builds the physical grid
 */
async function init() {
    try {
        // Fetch the high-quality periodic table data
        const response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
        const data = await response.json();
        
        // Loop through all 118 elements
        data.elements.forEach(el => {
            const div = document.createElement('div');
            
            // Create CSS classes: e.g., "element noble-gas"
            const categoryClass = el.category.replace(/\s+/g, '-').replace(/,/g, '');
            div.className = `element ${categoryClass}`;
            
            // IMPORTANT: Add data attributes so the Search Bar can find them
            div.setAttribute('data-name', el.name.toLowerCase());
            div.setAttribute('data-symbol', el.symbol.toLowerCase());
            
            // Position the element using xpos and ypos from the JSON
            div.style.gridColumn = el.xpos;
            div.style.gridRow = el.ypos;

            // Add the Atomic Number and Symbol to the tile
            div.innerHTML = `
                <span class="number">${el.number}</span>
                <span class="symbol">${el.symbol}</span>
            `;

            // INTERACTIVITY: Click to show full details in the sidebar
            div.onclick = () => showDetails(el);
            
            // INTERACTIVITY: Mouseover to quickly preview (Optional - great for students)
            div.onmouseover = () => showDetails(el);

            table.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading chemistry data:", error);
        table.innerHTML = "<p>Failed to load periodic table. Please check your internet connection.</p>";
    }
}

/**
 * 2. Show Element Details
 * Updates the right-hand sidebar when an element is clicked/hovered
 */
function showDetails(el) {
    // Hide the welcome text and show the data card
    document.getElementById('placeholder-text').style.display = 'none';
    document.getElementById('detail-card').style.display = 'block';
    
    // Update the text fields with chemical properties
    document.getElementById('el-name').innerText = `${el.name} (${el.symbol})`;
    document.getElementById('el-mass').innerText = el.atomic_mass.toFixed(3);
    document.getElementById('el-neg').innerText = el.electronegativity_pauling || 'N/A';
    document.getElementById('el-cat').innerText = el.category;
    document.getElementById('el-summary').innerText = el.summary;
    
    // Update the Wikipedia link
    const wikiLink = document.getElementById('el-wiki');
    wikiLink.href = el.source;
}

/**
 * 3. Search/Filter Logic
 * Hidden logic that runs when a student types in the search box
 */
function filterElements() {
    const searchTerm = document.getElementById('element-search').value.toLowerCase();
    const elements = document.querySelectorAll('.element');

    elements.forEach(div => {
        const name = div.getAttribute('data-name');
        const symbol = div.getAttribute('data-symbol');

        // Check if search term matches name or symbol
        if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
            div.classList.remove('is-hidden'); // Show it
        } else {
            div.classList.add('is-hidden');    // Hide it
        }
    });
}

// Start the app!
init();