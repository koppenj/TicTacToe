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
    tiles.forEach(tile => {
      tile.addEventListener('click',
        function markBoard(event) {
          let move = event.target.id;
          if (newBoard[move] == ' ') {
            newBoard[move] = `${playerTurn.marker}`;
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
    game.container.classList.remove('reset');
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

  const gameOver = (whoWon) => {
    game.container.replaceChildren();
    message.textContent = `${whoWon.name}`+ 'Wins!';
    game.container.classList.add('reset');
    game.container.textContent = 'GAME OVER';
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
      [2,5,8],];

    let diagWin = [
      [0,4,8],
      [2,4,6],];
// [Note]: I had to seperate the diagonal wins from first for loop. I'm assuming this is from diagWin[3] being undefined?
//          Either way, it is faster than original when it was three for-loops for each direction.

    for (let i = 0; i < 3; i++) {
      if ( (rowWin[i].every(v => xPosition.includes(v)))
        || (colWin[i].every(v => xPosition.includes(v))) ) {
        console.log('yes');
        whoWon = playerOne;
      }
      if ( (rowWin[i].every(v => oPosition.includes(v)))
        || (colWin[i].every(v => oPosition.includes(v))) ) {
        console.log('Yes times two');
        whoWon = playerTwo;
      }
    };
    for (let i = 0; i < diagWin.length; i++) {
      if (diagWin[i].every(v => xPosition.includes(v)) ) {
        whoWon = playerOne;
      }
      if (diagWin[i].every(v => oPosition.includes(v)) ) {
        whoWon = playerTwo;
      }
    };

    if (whoWon !== undefined) {
      message.textContent = `${whoWon.name}`+ ` Wins`;
      console.log(`${whoWon.name}`+ ` Wins`);
      gameOver(whoWon);
    }
    if (turnCount === 9 && whoWon === undefined ) {
      whoWon = 'Cats';
      console.log('Cats Game!');
      gameOver(whoWon);
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

// Also need to refactor so I can abort battle function in order to allow message to display properly. It currently
// wants to continue on with the callstack