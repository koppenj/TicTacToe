const gameBoard = (() => {
  const container = document.querySelector('#gameBoard');
  let board = ['X', 'O', 'X',
               'O', 'X', 'O',
               'X', 'O', 'X']
  for (let i = 0; i < board.length; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = board[i];
    container.appendChild(tile);
  }
return board;
})();

const playerCreate = (name, marker) => {
  return {name, marker};
};

const clearBoard = () => {
  console.log('hi mom')
  let board = [];
  return board;
}

  const button = document.querySelector('#clear');
  button.addEventListener('click', clearBoard);


