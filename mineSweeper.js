let field, result, test;
field = [
  [true, false, true, true, false],
  [true, false, false, false, false],
  [false, false, false, false, false],
  [true, false, false, false, false],
];

function Matrix(m, n, d) {
  let output = [];

  //rows
  for (let i = 0; i < m; i++) {
    output.push([]);
    //columns
    for (let j = 0; j < n; j++) {
      output[i].push(d);
    }
  }
  return output;
}

class Solution {
  constructor(matrix, click) {
    this.matrix = matrix;
    this.x = click[0];
    this.y = click[1];
    this.rows = this.matrix.length;
    this.cols = this.matrix[0].length;

    //initalize return matrix with -1 (converted from python)
    this.return_matrix = Matrix(this.rows, this.cols, -1);
    this.visited = Matrix(this.rows, this.cols, false);
  }

  get_adjacent_squares(x, y) {
    let adj;
    adj = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];
    return adj;
  }

  inBoard(x, y) {
    return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
  }

  countMines(x, y) {
    let count;
    count = 0;

    for (
      let square,
        idx = 0,
        adjSquares = this.get_adjacent_squares(x, y),
        numberOfSquares = adjSquares.length;
      idx < numberOfSquares;
      idx += 1
    ) {
      square = adjSquares[idx];

      if (
        this.inBoard(square[0], square[1]) &&
        this.matrix[square[0]][square[1]] === true
      ) {
        count += 1;
      }
    }

    return count;
  }

  reveal(x, y) {
    let adj, n;
    this.visited[x][y] = true;
    n = this.countMines(x, y);

    if (n !== 0) {
      this.return_matrix[x][y] = n;
      return;
    } else {
      this.return_matrix[x][y] = 0;
      adj = this.get_adjacent_squares(x, y);

      for (
        let square,
          idx = 0,
          adjSquares = adj,
          numberOfSquares = adjSquares.length;
        idx < numberOfSquares;
        idx += 1
      ) {
        square = adjSquares[idx];

        if (
          this.inBoard(square[0], square[1]) &&
          !this.visited[square[0]][square[1]]
        ) {
          this.reveal(square[0], square[1]);
        }
      }
    }

    return;
  }

  play(x, y) {
    this.reveal(x, y);
    return this.return_matrix;
  }
}

test = new Solution(field, [3, 2]);
result = test.play(3, 2);
console.log(result);
