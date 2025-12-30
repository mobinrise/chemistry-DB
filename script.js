alert("Hello!");
const table = document.getElementById('periodic-table');

async function init() {
    // 1. Fetch the element data
    const response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
    const data = await response.json();
    
    // 2. Loop through each element
    data.elements.forEach(el => {
        const div = document.createElement('div');
        div.className = `element ${el.category.replace(/\s+/g, '-')}`;
        
        // Use xpos and ypos from the JSON to place them in the grid
        div.style.gridColumn = el.xpos;
        div.style.gridRow = el.ypos;

        div.innerHTML = `
            <span class="number">${el.number}</span>
            <span class="symbol">${el.symbol}</span>
        `;

        div.onclick = () => showDetails(el);
        table.appendChild(div);
    });
}

function showDetails(el) {
    document.getElementById('placeholder-text').style.display = 'none';
    document.getElementById('detail-card').style.display = 'block';
    
    document.getElementById('el-name').innerText = `${el.name} (${el.symbol})`;
    document.getElementById('el-mass').innerText = el.atomic_mass.toFixed(3);
    document.getElementById('el-neg').innerText = el.electronegativity_pauling || 'N/A';
    document.getElementById('el-cat').innerText = el.category;
    document.getElementById('el-summary').innerText = el.summary;
    document.getElementById('el-wiki').href = el.source;
}

init();