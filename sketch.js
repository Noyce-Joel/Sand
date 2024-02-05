const make2DArray = (rows, cols) => {
  const arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
};

let grid;
let w = 5;
let cols, rows;
let matrix;

function setup() {
  createCanvas(700, 700);
  matrix = select('#brushSize').value();
  select('#brushSize').input(() => {
    matrix = select('#brushSize').value();
  })
  cols = width / w + 1;
  rows = height / w + 1;
  grid = make2DArray(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
}

const brushStroke = () => {
  let brushStroke = 10;
  return brushStroke;
};

const brushStrokeSize = brushStroke(); 

function mouseMoved() {
  let row = floor(mouseX / w);
  let col = floor(mouseY / w);
  if (col >= 0 && col < cols - 1 && row >= 0 && row <= rows - 1) {
    grid[row][col] = 1;
  }
  
  let ex = floor(matrix / 2);
  for (let i = -ex; i <= ex; i++) {
    for (let j = -ex; j <= ex; j++) {
      if (col + i >= 0 && col + i < cols - 1 && row + j >= 0 && row + j <= rows - 1) {
        grid[row + j][col + i] = 1;
      }
    }
  }
}

function draw() {
  background(0);
  ellipse(width / 2, height / 2, accelerationY);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      if (grid[i][j] === 1) {
        fill(255);
        let x = i * w;
        let y = j * w;
        circle(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let name;

      let state = grid[i][j];
      if (state === 1) {
        let below = grid[i][j + 1];
        let dir = random([-1, 1]);
        let belowLeft, belowRight;
        if (i > 0 && i < rows - 1 && j < cols - 1) {
          belowLeft = grid[i - dir][j + 1];
          belowRight = grid[i + dir][j + 1];
        }

        if (below === 0) {
          nextGrid[i][j + 1] = 1;
        } else if (belowRight === 0) {
          nextGrid[i + dir][j + 1] = 1;
        } else if (belowLeft === 0) {
          nextGrid[i - dir][j + 1] = 1;
        } else {
          nextGrid[i][j] = 1;
        }
      }
    }
  }

  grid = nextGrid;
}
