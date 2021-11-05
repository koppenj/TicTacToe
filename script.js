const message = document.querySelector('#notifications');
// Initialize game
const game = (() => {
  const container = document.querySelector('#gameBoard');
  const board = [' ', ' ', ' ',
               ' ', ' ', ' ',
               ' ', ' ', ' ']
  const draw = (board) => {
    for (let i = 0; i < board.length; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.id = i;
      tile.textContent = board[i];
      container.appendChild(tile);
    }
  };
  draw(board);
return { container, board , draw };
})();

// Player FF
const playerCreate = (name, marker) => {
  return {name, marker};
};
const Josh = playerCreate('Josh', 'X');
const Amanda = playerCreate('Amanda', 'O');

// Make tiles playable
const play = (() => {
  let turnCounter = Josh;
  let newBoard = [...game.board];

  const battle = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
      tile.addEventListener('click', (event) => {
        newBoard[event.target.id] = `${play.turnCounter.marker}`;
        game.container.replaceChildren();
        game.draw(newBoard);
        turnSwitch();
        battle();
      });
    });
  }
  return { battle, newBoard, turnCounter };
})();

// Button functions
const clearBoard = () => {
  console.log('hi mom');
  play.newBoard = [...game.board];
  game.container.replaceChildren();
  game.draw(play.newBoard);
}

  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', clearBoard);

  const newGame = () => {
    console.log('starting fresh');
    message.textContent = `${play.turnCounter.name}`+ `'s turn`;
    play.battle();
  }

  const newButton = document.querySelector('#newGame');
  newButton.addEventListener('click', newGame);

  const displayMessage = () => {
    message.textContent = `${play.turnCounter.name}`+ `'s turn`;
  }

  const turnSwitch = () => {
    if(play.turnCounter == Josh) {
      play.turnCounter = Amanda;
    } else {
      play.turnCounter = Josh;
    }
    displayMessage();
  }
