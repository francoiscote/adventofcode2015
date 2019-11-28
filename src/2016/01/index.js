const input = require("./input");

const CARDINAL_NORTH = "N";
const CARDINAL_EAST = "E";
const CARDINAL_SOUTH = "S";
const CARDINAL_WEST = "W";

class ChristmasMap {
  constructor() {
    this.cardinals = {
      [CARDINAL_NORTH]: { axis: "x", R: 1, L: -1 },
      [CARDINAL_EAST]: { axis: "y", R: -1, L: 1 },
      [CARDINAL_SOUTH]: { axis: "x", R: -1, L: 1 },
      [CARDINAL_WEST]: { axis: "y", R: 1, L: -1 }
    };

    this.position = {
      x: 0,
      y: 0
    };

    this.history = ["0,0"];

    this.currentCardinalKey = CARDINAL_NORTH;
  }

  follow(instruction) {
    const direction = instruction.slice(0, 1);
    const distance = instruction.slice(1);

    this.move(direction, distance);
    this.currentCardinalKey = this.getNextCardinalKey(direction);
  }

  move(direction, distance) {
    const { axis } = this.currentCardinal;

    for (let i = 0; i < distance; i++) {
      this.position[axis] += this.currentCardinal[direction];
      // Record History
      this.history.push(this.currentPositionKey);
    }
  }

  getNextCardinalKey(turn) {
    const turnIndex = {
      L: 3,
      R: 1
    };

    const cardinalKeys = Object.keys(this.cardinals);
    const currentIndex = cardinalKeys.indexOf(this.currentCardinalKey);

    // Circular bugger. Going Right from West (last index) will
    // bring you back to North (first index)
    const nextIndex = (currentIndex + turnIndex[turn]) % cardinalKeys.length;
    return cardinalKeys[nextIndex];
  }

  get currentDistance() {
    return ChristmasMap.calculateDistance(this.position.x, this.position.y);
  }

  static calculateDistance(x, y) {
    return Math.abs(x) + Math.abs(y);
  }

  get currentCardinal() {
    return this.cardinals[this.currentCardinalKey];
  }

  get currentPositionKey() {
    return `${this.position.x},${this.position.y}`;
  }

  get firstDoubleVisit() {
    return this.history.find((element, index) => {
      return this.history.includes(element, index + 1);
    });
  }

  get firstDoubleVisitDistance() {
    const visit = this.firstDoubleVisit.split(",");
    return ChristmasMap.calculateDistance(visit[0], visit[1]);
  }
}

// Follow instructions
const myMap = new ChristmasMap();
input.split(", ").forEach(instruction => myMap.follow(instruction));

console.log("Part 1:", myMap.currentDistance);
console.log("Part 2:", myMap.firstDoubleVisitDistance);
