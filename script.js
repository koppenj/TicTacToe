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

// Main
const play = (() => {
  let turnCounter;
  let playerOne;
  let playerTwo;

  const playerCreate = (name, marker) => {
    return {name, marker};
  };

  const getNames = () => {
    playerOne = playerCreate( prompt('Player One Name:'), 'X');
    playerTwo = playerCreate( prompt('Player Two Name:'), 'O');
    turnCounter = playerOne;
    return { playerOne, playerTwo }
  };
  const message = document.querySelector('#notifications');
  let newBoard = [...game.board];

  const battle = () => {
    const tiles = document.querySelectorAll('.tile');
    message.textContent = `${turnCounter.name}`+ `'s turn`;
    tiles.forEach((tile) => {
      tile.addEventListener('click', (event) => {
        if( newBoard[event.target.id] == ' ') {
          newBoard[event.target.id] = `${turnCounter.marker}`;
          game.container.replaceChildren();
          game.draw(newBoard);
          winCondition(newBoard);
          turnSwitch();
          battle();
        } else {
          message.textContent = 'That tile is already taken. Pick Again.';
        }
      });
    });
  }

  const turnSwitch = () => {
    if(turnCounter === playerOne) {
      turnCounter = playerTwo;
    } else {
      turnCounter = playerOne;
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
    getNames();
    clearBoard();
    battle();
  }

  const displayMessage = () => {
    message.textContent = `${turnCounter.name}`+ `'s turn`;
  }

  const winCondition = () => {
    let test = newBoard.join('');
    let whoWon;
    let whichPattern;
    // winPattern is only for a visual of which indices are to be looked at. Can't figure how to use it inside a check for now
    const winPattern = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
  const rowCheck = () => {
    // Check each row for win, return boolean if true and store which row
  }

  const ColCheck = () => {
    // Check eaach column for win, return boolean if true and store which column
  }

  const diaCheck = () => {
    // check both diagonals for win, blah blah blah
  }

  if (whoWon !== undefined) {
    // Do things to tell user the winner. Also disable the board, and prompt to play again
  }
  if ( (whoWon === undefined) && (test.length === 9) ) {
    // print cats game
  }


    };
  return { battle, clearBoard, newGame, turnCounter, getNames };
})();

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  play.clearBoard();
});

const newButton = document.querySelector('#newGame');
newButton.addEventListener('click', () => {
  play.newGame();
});

