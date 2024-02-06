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
let w = 10;
let cols, rows;
let matrix;

let hueValue = 0;

function setup() {
  createCanvas(590, 590);
  colorMode(HSB, 360, 255, 255);
  matrix = select("#brushSize").value();
  select("#brushSize").input(() => {
    matrix = select("#brushSize").value();
  });
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

function mouseDragged() {
  let row = floor(mouseX / w);
  let col = floor(mouseY / w);
  

  let ex = floor(matrix / 2);
  for (let i = -ex; i <= ex; i++) {
    for (let j = -ex; j <= ex; j++) {
      if (random(1) < 0.1) {
       
          grid[row + j][col + i] = hueValue;
        
      }
    }
  }
  hueValue += 0.5;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

function draw() {
  background(0);
  ellipse(width / 2, height / 2, accelerationY);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
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
      if (state > 0) {
        let below = grid[i][j + 1];
        let dir = random([-1, 1]);
        let belowLeft, belowRight;
        if (i > 0 && i < rows - 1 && j < cols - 1) {
          belowLeft = grid[i - dir][j + 1];
          belowRight = grid[i + dir][j + 1];
        }

        if (below === 0) {
          nextGrid[i][j + 1] = grid[i][j];
        } else if (belowRight === 0) {
          nextGrid[i + dir][j + 1] = grid[i][j];
        } else if (belowLeft === 0) {
          nextGrid[i - dir][j + 1] = grid[i][j];
        } else {
          nextGrid[i][j] = grid[i][j];
        }
      }
    }
  }

  grid = nextGrid;
}
