const gridContainer = document.getElementById('grid');
const canvas = document.querySelector('.canvas');
let x = 16;

//create the initial grid, and creates new grid with new size
function createGrid(x) {
    const gridSize = 480 / x; //sets grid size to be 480x480
    // deletes the current grid
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild);
    }
    //loops to make grid x by x size
    for(let i = 0; i < x; i++){
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for(let j = 0; j < x; j++){
            //creates the div elements and adds them to the page. 
            const gridColumn = document.createElement('div');
            gridColumn.classList.add('grid-square');
            gridColumn.addEventListener('mouseenter', shadeCell)
            gridRow.appendChild(gridColumn);
            gridColumn.style.width = (`${gridSize}px`)
            gridColumn.style.height = (`${gridSize}px`)
        }
        gridContainer.appendChild(gridRow);
    }
}
//creates a random rgb value
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//this function will shade the cell, making it darker every time it touches it
function shadeCell(event) {
    const currentColor = event.target.style.backgroundColor;
    
    //gives all 3 rgb values
    if (currentColor === "") {
        const color1 = getRandomInt(200) + 55;
        const color2 = getRandomInt(200) + 55;
        const color3 = getRandomInt(200) + 55;

        //sets background color equal to random int and saves that random int
        event.target.style.backgroundColor = `rgb(${color1}, ${color2}, ${color3})`;
        event.target.dataset.initialColors = `${color1},${color2},${color3}`;

    } else {
        const initialColors = event.target.dataset.initialColors.split(',');

        let rgb = currentColor
                                .replace(/[^\d,]/g, '')
                                .split(',')
                          
        //decreases by 10% of the initial value each time
        const decreaseFactor = 0.9;
        let newColor1 = Math.floor(parseInt(rgb[0]) -parseInt(initialColors[0]) * (1 - decreaseFactor));
        let newColor2 = Math.floor(parseInt(rgb[1]) -parseInt(initialColors[1]) * (1 - decreaseFactor));
        let newColor3 = Math.floor(parseInt(rgb[2]) -parseInt(initialColors[2]) * (1 - decreaseFactor));

        event.target.style.backgroundColor = `rgb(${newColor1}, ${newColor2}, ${newColor3})`;

    }
}

canvas.addEventListener('click', newGrid)

//gets user input to change grid size
function newGrid() {
    let userInput = prompt("Enter Grid Size");
    x = userInput;
    createGrid(x);
}


createGrid(x);