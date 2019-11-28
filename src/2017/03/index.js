const _ = require('lodash')
const input = require('./input')

// -------------------------------------
// PART 1
// -------------------------------------
const solution1 = null

const findGridSize = n => {
  let answer = null
  let size = 1
  while (!answer) {
    const grid = Math.pow(size, 2)
    if (grid >= n) {
      answer = size
    }
    size += 2
  }
  return answer
}

const gridSize = findGridSize(input)
// console.log(gridSize);

/* the rest is just notes from doing it by hand
{236, 607}

righ 68
up 303
total 371

try to understand why the difference between the my number and the bottom-right
corner is the same as the distance from my number to the center. Mathemagics!

*/
// console.log('Part 1:', 371);

// -------------------------------------
// PART 2
// -------------------------------------

class SpiralMap {
  constructor(size) {
    this.map = []
    this.mapSize = size

    console.log('Building a map of size', this.mapSize)

    // Build Map
    for (let ri = 0; ri < this.mapSize; ri++) {
      const row = []
      for (let ci = 0; ci < this.mapSize; ci++) {
        row.push(null)
      }
      this.map.push(row)
    }

    // Define center
    const middle = (this.mapSize - 1) / 2
    this.head = {
      x: middle,
      y: middle,
      currentMovePattern: 0,
      currentSquareSize: 1,
      movesCounter: 0,
    }

    // Spiral Move Pattern
    this.MOVE_PATTERN = [
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
    ]

    this.populateMap(this.mapSize)
  }

  populateMapByIndex() {
    const i = 1
    for (let i = 0; i < this.mapSize * this.mapSize; i += 1) {
      if (i > 1) {
        this.moveHead()
      }
      // Write value
      this.writeToHead(i)
      i += 1
    }
  }

  populateMap(endValue) {
    let newVal = 0
    while (newVal <= endValue) {
      newVal = this.calculateValueAround(this.head.x, this.head.y)

      if (newVal) {
        // Write value
        this.writeToHead(newVal)
      } else {
        this.writeToHead(1)
      }

      // Move Head to next spot
      // if we can't move, the grid is full. get out.
      if (!this.moveHead()) {
        break
      }
    }
    console.log('Ended:', newVal)
  }

  calculateValueAround(sourceX, sourceY) {
    console.log('\n--------------------')
    console.log(`Calculate around ${sourceX}, ${sourceY}`)
    const neighboursMap = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 },
    ]

    return neighboursMap.reduce((acc, move) => {
      const nextPosition = {
        x: sourceX + move.x,
        y: sourceY + move.y,
      }
      let sum = 0
      const addValue = this.getValue(nextPosition.x, nextPosition.y)
      console.log(
        `-- found ${addValue} from ${nextPosition.x}, ${nextPosition.y}`,
      )
      if (addValue) {
        sum = addValue
      }
      return acc + sum
    }, 0)
  }

  get currentMovePattern() {
    return this.MOVE_PATTERN[this.head.currentMovePattern]
  }

  get currentSquareSize() {
    return this.head.currentSquareSize
  }

  moveHead() {
    // new Head position
    const newHeadX = this.head.x + this.currentMovePattern.x
    const newHeadY = this.head.y + this.currentMovePattern.y

    if (newHeadX < 0 || newHeadY < 0) {
      return false
    }

    // update Head position
    this.head.x = newHeadX
    this.head.y = newHeadY

    this.head.movesCounter += 1

    // 2. updateMovePattern()
    if (this.head.movesCounter === this.head.currentSquareSize) {
      this.updateMovePattern()
    }

    // 3. Advance until current square size again
    if (this.head.movesCounter === this.head.currentSquareSize * 2) {
      // 4. updateMovePattern and bump squaresize
      this.head.currentSquareSize += 1
      this.updateMovePattern()
      // Reset move Counter
      this.head.movesCounter = 0
    }

    return true
  }

  updateMovePattern() {
    this.head.currentMovePattern += 1
    if (this.head.currentMovePattern > this.MOVE_PATTERN.length - 1) {
      this.head.currentMovePattern = 0
    }
    // console.log('Updated Move Pattern to ', this.currentMovePattern);
  }

  writeToHead(value) {
    const row = this.map[this.head.y]
    if (row) {
      row[this.head.x] = value
      console.log(
        `Writing value ${value} to head at x:${this.head.x}, y:${this.head.y}`,
      )
      return
    }
    throw new Error(
      `Cannot write value ${value} to head at x:${this.head.x}, y:${this.head.y}`,
    )
  }

  getValue(x, y) {
    const row = this.map[y]
    if (row) {
      return row[x]
    }
    return false
  }

  get headValue() {
    return this.getValue(this.head.x, this.head.y)
  }

  printMap() {
    this.map.forEach((row, ri) => {
      let thisRow = ''
      row.forEach((col, ci) => {
        thisRow = `${thisRow}${col}\t`
      })
      console.log(`${thisRow}\n`)
    })
  }
}

const part2Map = new SpiralMap(607)
part2Map.populateMap(368078)
// part2Map.printMap();
