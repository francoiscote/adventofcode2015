const input = require('./inputs/06').split('\n');

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    const row = Array(width).fill(false);
    this.grid = Array(width).fill(row);
  }

  applyOnGrid(xFrom, yFrom, xTo, yTo, operation) {
    if (typeof operation !== 'function') {
      throw 'Operation must be a function';
    }
    for (let h = yFrom; h <= yTo; h++) {
      for (let w = xFrom; w <= xTo; w++) {
        operation.call(this, h, w);
      }
    }
  }

  do(command, xFrom, yFrom, xTo, yTo) {
    console.log(command, xFrom, yFrom, xTo, yTo);

    let actionFunc = null;

    switch (command) {
      case 'toggle':
        actionFunc = (h, w) => {
          this.grid[h][w] = !this.grid[h][w];
        };
        break;
      case 'turnon':
        actionFunc = (h, w) => {
          this.grid[h][w] = true;
        };
        break;
      case 'turnoff':
        actionFunc = (h, w) => {
          this.grid[h][w] = false;
        };
        break;
      default:
        console.log('Nothing to do');
    }

    this.applyOnGrid(xFrom, yFrom, xTo, yTo, actionFunc);
  }


  // ------------
  // READ OUT METHODS
  // ------------
  getLight(h, w) {
    return this.grid[h][w];
  }
  countLightsOn() {
    // Two-dimensional count
    return this.grid.reduce((memoRow, row) => {
      const debugRow = [];
      const rowCount = row.reduce((memoLight, light) => memoLight += (light) ? 1 : 0, 0);
      return memoRow += rowCount;
    }, 0);
  }
}

class InstructionsParser {
  constructor(inst, grid) {
    this.inst = inst;
    this.grid = grid;
  }
  parse() {
    this.inst.map((i, d) => {
      const match = i.match(/(toggle|turn (on|off))\s(\d{1,3})\,(\d{1,3})\sthrough\s(\d{1,3})\,(\d{1,3})/i);

      // Format Values
      const command = match[1].split(' ').join('');
      const xFrom = parseInt(match[3], 10);
      const yFrom = parseInt(match[4], 10);
      const xTo = parseInt(match[5], 10);
      const yTo = parseInt(match[6], 10);

      this.grid.do(command, xFrom, yFrom, xTo, yTo);
    });
  }
}

const part1 = new Grid(1000, 1000);

const parser1 = new InstructionsParser(input, part1);
parser1.parse();
console.log(part1.countLightsOn());
