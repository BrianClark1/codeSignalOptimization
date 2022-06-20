function mineSweeper(inputMatrix) {
  var newArr = [];

  for (var i = 0; i < inputMatrix.length; i++) {
    newArr.push([]);
    for (var j = 0; j < inputMatrix[i].length; j++) {
      var cnt = 0;
      if (i > 0) {
        if (inputMatrix[i - 1][j]) {
          cnt += 1;
        }
        if (inputMatrix[i - 1][j + 1]) {
          cnt += 1;
        }
        if (inputMatrix[i - 1][j - 1]) {
          cnt += 1;
        }
      }
      if (i < inputMatrix.length - 1) {
        if (inputMatrix[i + 1][j]) {
          cnt += 1;
        }
        if (inputMatrix[i + 1][j + 1]) {
          cnt += 1;
        }
        if (inputMatrix[i + 1][j - 1]) {
          cnt += 1;
        }
      }

      if (inputMatrix[i][j + 1]) {
        cnt += 1;
      }
      if (inputMatrix[i][j - 1]) {
        cnt += 1;
      }
      newArr[i].push(cnt);
    }
  }
  return newArr;
}

let matrix = [[false, true, true],
    [true, false, true],
    [false, false, true]]
    
    console.log(mineSweeper(matrix))


    const updateBoard = function (board, click) {
      const empty = "E";
      const hiddenMine = "M";
      const revealedMine = "X";
      const revealedEmpty = "B";

      function valueAt(position) {
        return board[position[0]][position[1]];
      }

      function updateAt(position, value) {
        board[position[0]][position[1]] = value;
      }

      function addAdjacentEmpty(position, stack) {
        adjacentPositions(position).forEach((currentPosition) => {
          if (valueAt(currentPosition) === empty) {
            let numAdjacentMines = countMines(currentPosition);
            if (numAdjacentMines === 0) {
              updateAt(currentPosition, revealedEmpty);
            } else {
              updateAt(currentPosition, `${numAdjacentMines}`);
            }
            stack.push(currentPosition);
          }
        });
      }

      function countMines(position) {
        let count = 0;
        adjacentPositions(position).forEach((currentPosition) => {
          if (valueAt(currentPosition) === hiddenMine) {
            count++;
          }
        });
        return count;
      }

      function isInBounds(position) {
        return (
          position[0] >= 0 &&
          position[0] < board.length &&
          position[1] >= 0 &&
          position[1] < board[0].length
        );
      }

      function adjacentPositions(position) {
        // try checking isInBounds to return only legal positions for optimization
        const positions = [];
        const row = position[0];
        const col = position[1];

        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (isInBounds([i, j])) {
              positions.push([i, j]);
            }
          }
        }
        return positions;
      }

      const stack = [click];
      while (stack.length > 0) {
        let currentPosition = stack.pop();

        // End the game if clicked on mine
        if (valueAt(click) === hiddenMine) {
          updateAt(click, revealedMine);
          return board;
        }

        // Edge case when user just clicks on a square that has a mine next to it
        // it does not spread out to reveal other empty squares
        let numAdjacentMines = countMines(click);
        if (numAdjacentMines !== 0) {
          updateAt(click, `${numAdjacentMines}`);
          return board;
        }

        // Spread out to reveal other empty squares
        let currentValue = valueAt(currentPosition);
        if (currentValue === empty || currentValue === revealedEmpty) {
          addAdjacentEmpty(currentPosition, stack);
        }
      }

      return board;
    };