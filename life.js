var rows = 25;
var cols = 25;

var playing = false;

//initialize
function initialize() {
  createTable();
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
  var classes = this.getAttribute('class');
  if (classes.indexOf('live') > -1) {
    this.setAttribute('class', 'dead');
  } else {
    this.setAttribute('class', 'live');
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
