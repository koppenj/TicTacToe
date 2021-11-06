// Rendering and default handling
const game = (() => {
  const container = document.querySelector('#gameBoard');
  const board = [' ', ' ', ' ',
               ' ', ' ', ' ',
               ' ', ' ', ' ']
  const draw = (template) => {
    for (let i = 0; i < template.length; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.id = i;
      tile.textContent = template[i];
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

// Main
const play = (() => {
  const message = document.querySelector('#notifications');
  let newBoard = [...game.board];
  let turnCounter = Josh;

  const battle = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
      tile.addEventListener('click', (event) => {
        if( newBoard[event.target.id] == ' ') {
          newBoard[event.target.id] = `${turnCounter.marker}`;
          game.container.replaceChildren();
          game.draw(newBoard);
          turnSwitch();
          battle();
        } else {
          message.textContent = 'That tile is already taken. Pick Again.';
        }
      });
    });
  }

  const turnSwitch = () => {
    if(turnCounter == Josh) {
      turnCounter = Amanda;
    } else {
      turnCounter = Josh;
    }
    displayMessage();
  }

  const clearBoard = () => {
    game.container.replaceChildren();
    newBoard = [...game.board];
    game.draw(newBoard);
    message.textContent = 'Tic-Tac-Toe: Choose New Game To Begin';
  }

  const newGame = () => {
    clearBoard();
    message.textContent = `${turnCounter.name}`+ `'s turn`;
    battle();
  }

  const displayMessage = () => {
    message.textContent = `${turnCounter.name}`+ `'s turn`;
  }

  return { battle, newBoard, message, clearBoard, newGame };
})();

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  play.clearBoard();
});

const newButton = document.querySelector('#newGame');
newButton.addEventListener('click', () => {
  play.newGame()
});
