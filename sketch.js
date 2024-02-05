const make2DArray = (rows, cols) => {
  const arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols).fill(0)
  }
  return arr;
}

let grid;
let w = 5;
let cols, rows;


function setup() {
  createCanvas(400, 400);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(rows, cols)
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0
    }
  }
  grid[20][10] = 100
}

function draw() {
  background(100);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      stroke(255)
      fill(grid[i][j] * 255)
      let x = i * w;
      let y = j * w;
      square(x, y, w)
    }
  }
  
  let nextGrid = make2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let state = grid[i][j];
      if (state === 1) {
        let below = grid[i][j + 1];
        if (below === 0) {
          
        }
      }
    }
  }
  
}