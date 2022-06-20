// function mineSweeper(inputMatrix) {
//   var newArr = [];

//   for (var i = 0; i < inputMatrix.length; i++) {
//     newArr.push([]);
//     for (var j = 0; j < inputMatrix[i].length; j++) {
//       var cnt = 0;
//       if (i > 0) {
//         if (inputMatrix[i - 1][j]) {
//           cnt += 1;
//         }
//         if (inputMatrix[i - 1][j + 1]) {
//           cnt += 1;
//         }
//         if (inputMatrix[i - 1][j - 1]) {
//           cnt += 1;
//         }
//       }
//       if (i < inputMatrix.length - 1) {
//         if (inputMatrix[i + 1][j]) {
//           cnt += 1;
//         }
//         if (inputMatrix[i + 1][j + 1]) {
//           cnt += 1;
//         }
//         if (inputMatrix[i + 1][j - 1]) {
//           cnt += 1;
//         }
//       }

//       if (inputMatrix[i][j + 1]) {
//         cnt += 1;
//       }
//       if (inputMatrix[i][j - 1]) {
//         cnt += 1;
//       }
//       newArr[i].push(cnt);
//     }
//   }
//   return newArr;
// }

// let matrix = [[false, true, true],
//     [true, false, true],
//     [false, false, true]]
    
//     console.log(mineSweeper(matrix))


//     const updateBoard = function (board, click) {
//       const empty = "E";
//       const hiddenMine = "M";
//       const revealedMine = "X";
//       const revealedEmpty = "B";

//       function valueAt(position) {
//         return board[position[0]][position[1]];
//       }

//       function updateAt(position, value) {
//         board[position[0]][position[1]] = value;
//       }

//       function addAdjacentEmpty(position, stack) {
//         adjacentPositions(position).forEach((currentPosition) => {
//           if (valueAt(currentPosition) === empty) {
//             let numAdjacentMines = countMines(currentPosition);
//             if (numAdjacentMines === 0) {
//               updateAt(currentPosition, revealedEmpty);
//             } else {
//               updateAt(currentPosition, `${numAdjacentMines}`);
//             }
//             stack.push(currentPosition);
//           }
//         });
//       }

//       function countMines(position) {
//         let count = 0;
//         adjacentPositions(position).forEach((currentPosition) => {
//           if (valueAt(currentPosition) === hiddenMine) {
//             count++;
//           }
//         });
//         return count;
//       }

//       function isInBounds(position) {
//         return (
//           position[0] >= 0 &&
//           position[0] < board.length &&
//           position[1] >= 0 &&
//           position[1] < board[0].length
//         );
//       }

//       function adjacentPositions(position) {
//         // try checking isInBounds to return only legal positions for optimization
//         const positions = [];
//         const row = position[0];
//         const col = position[1];

//         for (let i = row - 1; i <= row + 1; i++) {
//           for (let j = col - 1; j <= col + 1; j++) {
//             if (isInBounds([i, j])) {
//               positions.push([i, j]);
//             }
//           }
//         }
//         return positions;
//       }

//       const stack = [click];
//       while (stack.length > 0) {
//         let currentPosition = stack.pop();

//         // End the game if clicked on mine
//         if (valueAt(click) === hiddenMine) {
//           updateAt(click, revealedMine);
//           return board;
//         }

//         // Edge case when user just clicks on a square that has a mine next to it
//         // it does not spread out to reveal other empty squares
//         let numAdjacentMines = countMines(click);
//         if (numAdjacentMines !== 0) {
//           updateAt(click, `${numAdjacentMines}`);
//           return board;
//         }

//         // Spread out to reveal other empty squares
//         let currentValue = valueAt(currentPosition);
//         if (currentValue === empty || currentValue === revealedEmpty) {
//           addAdjacentEmpty(currentPosition, stack);
//         }
//       }

//       return board;
//     };




//     var updateBoard = function(board, click) {
//     if(!board) return board;
    
//     const [r, c] = click;
    
//     const getAdjacentSquares = (r, c) => [
//         [r -1, c -1],
//         [r -1, c],
//         [r -1, c + 1],
//         [r, c -1],
//         [r, c + 1],
//         [r + 1, c -1],
//         [r + 1, c],
//         [r + 1, c + 1],
//     ];
    
//     const value = board[r][c];
    
//     // game over (mine)
//     if(value === 'M') {
//         board[r][c] = 'X';
        
//         return board;
//     }
    
//     const getAdjacentMines = (r, c) => {
//         let count = 0;
        
//         for(let next of getAdjacentSquares(r, c)) {
//             const [r, c] = next;
            
//             if(r < 0 || r > board.length -1) continue;
//             if(c < 0 || c > board[0].length -1) continue;
            
//             if(board[r][c] === 'M') {
//                 count ++;
//             }
//         }
        
//         return count;
//     }
    
//     if(value === 'E') {
//         let mines = getAdjacentMines(r, c);
        
//         if(mines === 0) {
//             const dfs = (r, c) => {
//                 if(r < 0 || r > board.length -1) return;
//                 if(c < 0 || c > board[0].length -1) return;
                
//                 if(board[r][c] !== 'E') return;
                
//                 const adjmines = getAdjacentMines(r, c);
                
//                 board[r][c] = adjmines === 0 ? 'B' : String(adjmines);
                
//                 if(adjmines > 0) return;
                
//                 for(let next of getAdjacentSquares(r, c)) {
//                     const [r, c] = next;
                    
//                     dfs(r, c);
//                 }
//             }
            
//             dfs(r, c);
//         } else {
//             board[r][c] = String(mines);
//         }
//     }
    
//     return board;
//     };





    // var updateBoard = function (board, click) {
    //   if (!board) return board;

    //   const [r, c] = click;

    //   const getAdjacentSquares = (r, c) => [
    //     [r - 1, c - 1],
    //     [r - 1, c],
    //     [r - 1, c + 1],
    //     [r, c - 1],
    //     [r, c + 1],
    //     [r + 1, c - 1],
    //     [r + 1, c],
    //     [r + 1, c + 1],
    //   ];

    //   const value = board[r][c];

    //   // game over (mine)
    //   if (value === "M") {
    //     board[r][c] = "X";

    //     return board;
    //   }

    //   const getAdjacentMines = (r, c) => {
    //     let count = 0;

    //     for (let next of getAdjacentSquares(r, c)) {
    //       const [r, c] = next;

    //       if (r < 0 || r > board.length - 1) continue;
    //       if (c < 0 || c > board[0].length - 1) continue;

    //       if (board[r][c] === "M") {
    //         count++;
    //       }
    //     }

    //     return count;
    //   };

    //   if (value === "E") {
    //     let mines = getAdjacentMines(r, c);

    //     if (mines === 0) {
    //       const dfs = (r, c) => {
    //         if (r < 0 || r > board.length - 1) return;
    //         if (c < 0 || c > board[0].length - 1) return;

    //         if (board[r][c] !== "E") return;

    //         const adjmines = getAdjacentMines(r, c);

    //         board[r][c] = adjmines === 0 ? "B" : String(adjmines);

    //         if (adjmines > 0) return;

    //         for (let next of getAdjacentSquares(r, c)) {
    //           const [r, c] = next;

    //           dfs(r, c);
    //         }
    //       };

    //       dfs(r, c);
    //     } else {
    //       board[r][c] = String(mines);
    //     }
    //   }

    //   return board;
    // };



    // const mineSweeper = function (board, click) {
    //   const rows = board.length;
    //   const cols = board[0].length;
    //   dfs(click[0], click[1]);
    //   return board;

    //   function dfs(i, j) {
    //     if (!board[i][j]) return;
    //     if (board[i][j] === "M") {
    //       board[i][j] = "X";
    //       return;
    //     }
    //     if (board[i][j] !== "E") return;

    //     const mines = checkForMine(i, j); // Check for mines

    //     if (mines) {
    //       board[i][j] = mines.toString();
    //       return;
    //     } else {
    //       // If we haven't got mines, check another cells
    //       board[i][j] = "B";
    //       for (let x = Math.max(i - 1, 0); x < Math.min(i + 2, rows); x++) {
    //         for (let y = Math.max(j - 1, 0); y < Math.min(j + 2, cols); y++) {
    //           dfs(x, y);
    //         }
    //       }
    //     }
    //   }

    //   function checkForMine(x, y) {
    //     let mines = 0;
    //     for (let i = Math.max(x - 1, 0); i < Math.min(x + 2, rows); i++) {
    //       for (let j = Math.max(y - 1, 0); j < Math.min(y + 2, cols); j++) {
    //         if (board[i][j] === "M") mines++;
    //       }
    //     }
    //     return mines;
    //   }
    // };


    // let matrix = [
    //   [false, true, true],
    //   [true, false, true],
    //   [false, false, true],
    // ];

    // console.log(mineSweeper(matrix));



function mineSweeper(matrix) {
    const board = [];
    for (let x = 0; x < matrix.length; x++) {
        board.push([]);
        for (let y = 0; y < matrix[0].length; y++) {
          board[x][y] = 0;
          //Above
          if (matrix[x - 1] !== undefined) {
            if (matrix[x - 1][y]) {
              board[x][y]++;
            }
          }
          //Below
          if (matrix[x + 1] !== undefined) {
            if (matrix[x + 1][y]) {
              board[x][y]++;
            }
          }
          //Left
          if (matrix[x][y - 1] !== undefined) {
            if (matrix[x][y - 1]) {
              board[x][y]++;
            }
          }
          //Right
          if (matrix[x][y + 1] !== undefined) {
            if (matrix[x][y + 1]) {
              board[x][y]++;
            }
          }
          //Top Left
          if (matrix[x - 1] !== undefined) {
            if (matrix[x - 1][y - 1]) {
              board[x][y]++;
            }
          }
          //Top Right
          if (matrix[x - 1] !== undefined) {
            if (matrix[x - 1][y + 1]) {
              board[x][y]++;
            }
          }
          //Bottom Left
          if (matrix[x + 1] !== undefined) {
            if (matrix[x + 1][y - 1]) {
              board[x][y]++;
            }
          }
          //Bottom Right
          if (matrix[x + 1] !== undefined) {
            if (matrix[x + 1][y + 1]) {
              board[x][y]++;
            }
          }
        }
    }
    return board;
}
    
    let matrix = [
      [false, true, true],
      [true, false, true],
      [false, false, true],
    ];

    console.log(mineSweeper(matrix));