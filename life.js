var rows = 75;
var cols = 75;

let playing = false;
let timer;
let reproductionTime = 100;

const grid = new Array(rows);
const nextGrid = new Array(rows);

function initializeGrids() {
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    nextGrid[i] = new Array(cols);
  }
}
function resetGrids() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
      nextGrid[i][j] = 0;
    }
  }
}
function copyAndResetGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = nextGrid[i][j];
      nextGrid[i][j] = 0;
    }
  }
}

//initialize
function initialize() {
  createTable();
  initializeGrids();
  resetGrids();
  setupControlButtons();
}

// layout grid
function createTable() {
  const gridContainer = document.getElementById('gridContainer');
  if (!gridContainer) {
    //error message
    console.error('Error: no div for the grid table');
  }
  const table = document.createElement('table');

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', i + '_' + j);
      cell.setAttribute('class', 'dead');
      cell.onclick = cellClickHandler;
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

function cellClickHandler() {
  const rowcol = this.id.split('_');
  const row = rowcol[0];
  const col = rowcol[1];
  const classes = this.getAttribute('class');
  if (classes.indexOf('live') > -1) {
    this.setAttribute('class', 'dead');
    grid[row][col] = 0;
  } else {
    this.setAttribute('class', 'live');
    grid[row][col] = 1;
  }
}

function updateView() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(i + '_' + j);
      if (grid[i][j] == 0) {
        cell.setAttribute('class', 'dead');
      } else {
        cell.setAttribute('class', 'live');
      }
    }
  }
}
function setupControlButtons() {
  //button to start game
  const startButton = document.getElementById('start');
  startButton.onclick = startButtonHandler;

  //button to clear grid
  const clearButton = document.getElementById('clear');
  clearButton.onclick = clearButtonHandler;

  //button to set random initial state
  const randomButton = document.getElementById('random');
  randomButton.onclick = randomButtonHandler;
}

function randomButtonHandler() {
  if (playing) return;
  clearButtonHandler();
  for (let i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      const isLive = Math.round(Math.random());
      if (isLive == 1) {
        const cell = document.getElementById(i + '_' + j);
        cell.setAttribute('class', 'live');
        grid[i][j] = 1;
      }
    }
  }
}

function clearButtonHandler() {
  console.log('clear the game: stop playing and clear the grid');
  playing: false;
  const startButton = document.getElementById('start');
  startButton.innerHTML = 'start';

  clearTimeout(timer);
  //gets elements as node list/ so then copy as an array
  const cellsList = document.getElementsByClassName('live');
  const cells = [];
  for (let i = 0; i < cellsList.length; i++) {
    cells.push(cellsList[i]);
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].setAttribute('class', 'dead');
  }
  resetGrids();
}

function startButtonHandler() {
  if (playing) {
    console.log('pause the game');
    playing = false;
    this.innerHTML = 'continue';
    clearTimeout(timer);
  } else {
    console.log('continue the game');
    playing = true;
    this.innerHTML = 'pause';
    play();
  }
}
function play() {
  console.log('play the game');
  computeNextGen();

  if (playing) {
    timer = setTimeout(play, reproductionTime);
  }
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);
    }
  }
  // copy nexGrid to grid and reset nextGrid
  copyAndResetGrid();
  //copy all 1 values to be live in the table
  updateView();
}

function applyRules(row, col) {
  const numNeighbors = countNeighbors(row, col);
  if (grid[row][col] == 1) {
    if (numNeighbors < 2) {
      nextGrid[row][col] = 0;
    } else if (numNeighbors == 2 || numNeighbors == 3) {
      nextGrid[row][col] = 1;
    } else if (numNeighbors > 3) {
      nextGrid[row][col] = 0;
    }
  } else if (grid[row][col] == 0) {
    if (numNeighbors == 3) {
      nextGrid[row][col] = 1;
    }
  }
}

//verify later
function countNeighbors(row, col) {
  let count = 0;
  if (row - 1 >= 0) {
    if (grid[row - 1][col] == 1) count++;
  }

  if (row - 1 >= 0 && col - 1 >= 0) {
    if (grid[row - 1][col - 1] == 1) count++;
  }
  if (row - 1 >= 0 && col + 1 < cols) {
    if (grid[row - 1][col + 1] == 1) count++;
  }
  if (col - 1 >= 0) {
    if (grid[row][col - 1] == 1) count++;
  }
  if (col + 1 < cols) {
    if (grid[row][col + 1] == 1) count++;
  }
  if (row + 1 < rows) {
    if (grid[row + 1][col] == 1) count++;
  }
  if (row + 1 < rows && col - 1 >= 0) {
    if (grid[row + 1][col - 1] == 1) count++;
  }
  if (row + 1 < rows && col + 1 < cols) {
    if (grid[row + 1][col + 1] == 1) count++;
  }

  return count;
}
//start everything
// createTable();
window.onload = initialize;
