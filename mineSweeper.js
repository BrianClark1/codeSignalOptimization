
let field, result, test;
field = [
  [true, false, true, true, false],
  [true, false, false, false, false],
  [false, false, false, false, false],
  [true, false, false, false, false],
];



class Solution {
  constructor(matrix, click) {
    this.matrix = matrix;
    this.x = click[0];
    this.y = click[1];
    this.rows = this.matrix.length;
      this.cols = this.matrix[0].length;
      let range = n => Array.from(Array(n).keys())

        //let idx = 0;
      //initalize return matrix with -1 (converted from python)

    this.return_matrix = function () {
      let returnMatrixRows = [],
            returnMatrixCols = range(this.rows);
      

      for (let idx = 0, lengthTemp = returnMatrixCols.length; idx < lengthTemp; idx += 1) {
        let i = returnMatrixCols[idx];

        returnMatrixRows.push(
          function () {
            let _pj_e = [],
              _pj_f = range(this.cols);

            for (
              let _pj_g = 0, _pj_h = _pj_f.length;
              _pj_g < _pj_h;
              _pj_g += 1
            ) {
              let i = _pj_f[_pj_g];

              _pj_e.push(-1);
            }

            return _pj_e;
          }.call(this)
        );
      }

      return returnMatrixRows;
      }.call(this);
      
    this.visited = function () {
      let returnMatrixRows = [],
        returnMatrixCols = range(this.rows);

      for (let idx = 0, lengthTemp = returnMatrixCols.length; idx < lengthTemp; idx += 1) {
        let i = returnMatrixCols[idx];

        returnMatrixRows.push(
          function () {
            let _pj_e = [],
              _pj_f = range(this.cols);

            for (
              let _pj_g = 0, _pj_h = _pj_f.length;
              _pj_g < _pj_h;
              _pj_g += 1
            ) {
              let i = _pj_f[_pj_g];

              _pj_e.push(false);
            }

            return _pj_e;
          }.call(this)
        );
      }

      return returnMatrixRows;
    }.call(this);
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
        returnMatrixRows = this.get_adjacent_squares(x, y),
        returnMatrixCols = returnMatrixRows.length;
      idx < returnMatrixCols;
      idx += 1
    ) {
      square = returnMatrixRows[idx];

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
        let square, idx = 0, returnMatrixRows = adj, returnMatrixCols = returnMatrixRows.length;
        idx < returnMatrixCols;
        idx += 1
      ) {
        square = returnMatrixRows[idx];

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

test = new Solution(field, [3,2]);
result = test.play(3, 2);
console.log(result);




