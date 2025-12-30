const elements = [
    { name: "Hydrogen", symbol: "H", number: 1, x: 1, y: 1 },
    { name: "Helium", symbol: "He", number: 2, x: 18, y: 1 },
    { name: "Lithium", symbol: "Li", number: 3, x: 1, y: 2 },
    { name: "Beryllium", symbol: "Be", number: 4, x: 2, y: 2 },
    // ... you would add the rest here
];

const table = document.getElementById('periodic-table');

elements.forEach(el => {
    const div = document.createElement('div');
    div.className = 'element';
    
    // Position the element in the grid
    div.style.gridColumn = el.x;
    div.style.gridRow = el.y;

    div.innerHTML = `
        <div class="at-num">${el.number}</div>
        <div class="symbol">${el.symbol}</div>
    `;

    div.onclick = () => showDetails(el);
    table.appendChild(div);
});
function colorByElectronegativity(value) {
    // Flourine is ~4.0 (Red), Francium is ~0.7 (Blue)
    const hue = (1 - (value / 4)) * 240; 
    return `hsl(${hue}, 70%, 80%)`;
}