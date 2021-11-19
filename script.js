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
      tile.addEventListener('click', function test(event) {
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

  const winCondition = () => {
    let xPosition = [];
    let oPosition = [];
    let whoWon;

    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === 'X') {
        xPosition.push(i);
      }
      if (newBoard[i] === 'O') {
        oPosition.push(i);
      }
    };

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
      for (let i = 0; i < rowWin.length; i++) {
        if ( rowWin[i].every(v => xPosition.includes(v))) {
          return whoWon = playerOne;
        }
        if ( rowWin[i].every(v => oPosition.includes(v))) {
          return whoWon = playerTwo;
        }
      }
    })();

    const ColCheck = (() => {
      for (let i = 0; i < colWin.length; i++) {
        if ( colWin[i].every(v => xPosition.includes(v))) {
          return whoWon = playerOne;
        }
        if ( colWin[i].every(v => oPosition.includes(v))) {
          return whoWon = playerTwo;
        }
      }
    })();

    const diaCheck = (() => {
      for (let i = 0; i < diagWin.length; i++) {
        if ( diagWin[i].every(v => xPosition.includes(v))) {
          return whoWon = playerOne;
        }
        if ( diagWin[i].every(v => oPosition.includes(v))) {
          return whoWon = playerTwo;
        }
      }
    })();

    if (whoWon !== undefined) {
      message.textContent = `${whoWon.name}`+ ` Wins`;
      console.log(`${whoWon.name}`+ ` Wins`);
      /* gameOver(); */
    }
    if (turnCount === 9 && whoWon === undefined ) {
      whoWon = 'Cats';
      console.log('Cats Game!');
      /* gameOver(); */
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
// How to lock out game bro? Need tiles and test function to be accessible/public
/* const gameOver = () => { removeEventListener('click', test(), true ) }; */
