var rows = 25;
var cols = 25;

var playing = false;

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

//initialize
function initialize() {
  createTable();
  initializeGrids();
  resetGrids();
  setupControlButtons();
}

// layout grid
function createTable() {
  var gridContainer = document.getElementById('gridContainer');
  if (!gridContainer) {
    //error message
    console.error('Error: no div for the grid table');
  }
  var table = document.createElement('table');

  for (var i = 0; i < rows; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols; j++) {
      var cell = document.createElement('td');
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
  var classes = this.getAttribute('class');
  if (classes.indexOf('live') > -1) {
    this.setAttribute('class', 'dead');
    grid[row][col] = 0;
  } else {
    this.setAttribute('class', 'live');
    grid[row][col] = 1;
  }
}

function setupControlButtons() {
  //button to start game
  var startButton = document.getElementById('start');
  startButton.onclick = startButtonHandler;

  //button to clear grid
  var clearButton = document.getElementById('clear');
  clearButton.onclick = clearButtonHandler;
}

function clearButtonHandler() {
  console.log('clear the game: stop playing and clear the grid');
  playing: false;
  var startButton = document.getElementById('start');
  startButton.innerHTML = 'start';
}
function startButtonHandler() {
  if (playing) {
    console.log('pause the game');
    playing = false;
    this.innerHTML = 'continue';
  } else {
    console.log('continue the game');
    playing = true;
    this.innerHTML = 'pause';
    play();
  }
}
function play() {
  console.log('play the game');
}
//start everything
// createTable();
window.onload = initialize;
