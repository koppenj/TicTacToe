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
  let playerTurn;
  let playerOne;
  let playerTwo;
  let turnCount = 1;

  const playerCreate = (name, marker) => {
    return {name, marker};
  };

  const getNames = () => {
    playerOne = playerCreate( prompt('Player One Name:'), 'X');
    playerTwo = playerCreate( prompt('Player Two Name:'), 'O');
    playerTurn = playerOne;
    return { playerOne, playerTwo }
  };
  const message = document.querySelector('#notifications');
  let newBoard = [...game.board];

  const battle = () => {
    const tiles = document.querySelectorAll('.tile');
    message.textContent = `${playerTurn.name}`+ `'s turn`;
    tiles.forEach((tile) => {
      tile.addEventListener('click', (event) => {
        if (newBoard[event.target.id] == ' ') {
          newBoard[event.target.id] = `${playerTurn.marker}`;
          game.container.replaceChildren();
          game.draw(newBoard);
          if (turnCount >= 3) {
            winCondition(newBoard);
          }

          turnSwitch();
          battle();
        } else {
          message.textContent = 'That tile is already taken. Pick Again.';
        }
      });
    });
  }

  const turnSwitch = () => {
    if (playerTurn === playerOne) {
      playerTurn = playerTwo;
    } else {
      playerTurn = playerOne;
    }
    turnCount++;
    displayMessage();
  }

  const clearBoard = () => {
    game.container.replaceChildren();
    newBoard = [...game.board];
    game.draw(newBoard);
    turnCount = 1;
    message.textContent = 'Tic-Tac-Toe: Choose New Game To Begin';
  }

  const newGame = () => {
    getNames();
    clearBoard();
    battle();
  }

  const displayMessage = () => {
    message.textContent = `${playerTurn.name}`+ `'s turn`;
  }

  const winCondition = (newBoard) => {
    let test = newBoard.join('');
    let whoWon;
    let whichPattern;
    let xPosition = [];
    let oPosition = [];
    // does this have value to do an index lookup table/array later when finding col and diag wins?
    // Its job is to find every index where a marker is placed in newBoard. then each helper function should be able to do
    // an indexOf lookup for respective win positions for both players
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === 'X') {
        xPosition.push(i);
      }
      if (newBoard[i] === 'O') {
        oPosition.push(i);
      }
    };

    console.log(xPosition);
    console.log(oPosition);

    let rowWin = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
    ];

    let colWin = [
      [0,3,6],
      [1,4,7],
      [2,5,8],
    ];

    let diagWin = [
      [0,4,8],
      [2,4,6],
    ];

    const rowCheck = (() => {
      for (let i = 0; i< rowWin.length; i++) {
        if (xPosition.contains(rowWin[i])) {
          whoWon = 'playerOne';
        } else if (oPosition.contains(rowWin[i])) {
          whoWon = 'playerTwo';
        } else {
          return false;
        }
      }
    })();

    const ColCheck = (() => {
      // Check eaach column for win, return boolean if true and store which column
      return false;
    })();

    const diaCheck = (() => {
      // check both diagonals for win, blah blah blah
      return false;
    })();

    if (whoWon !== undefined) {
      console.log(whoWon);
    }
    if (turnCount === 9 && whoWon === undefined ) {
      whoWon = 'Cats';
    };

  };
  return { clearBoard, newGame };
})();

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  play.clearBoard();
});

const newButton = document.querySelector('#newGame');
newButton.addEventListener('click', () => {
  play.newGame();
});

