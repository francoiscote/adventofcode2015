const input = require('./input').split('\n');
const _ = require('lodash');

// -------------------------------------
// PART 1
// -------------------------------------
let solution1 = null;


class InstructionsParser {
  constructor(instructions) {
    this.instructions = _.zipWith(instructions, i => ({ value: parseInt(i, 10), offset: 0 }) );
    this.current = 0;
    this.stepCount = 0;
  }

  parse() {
    // loop through instructions until we are out
    while(this.current <= this.instructions.length - 1) {
      this.move();
    }
  }

  move() {
    const { value, offset } = this.currentInstruction;

    // update offset
    this.updateOffset();

    // jump
    this.current += value + offset;

    // Save stepCount
    this.stepCount += 1;
  }

  updateOffset() {
    this.currentInstruction.offset += 1;
  }

  get currentInstruction() {
    return this.instructions[this.current];
  }
}

const parser = new InstructionsParser(input);
parser.parse();

console.log('Part 1:', parser.stepCount);

// -------------------------------------
// PART 2
// -------------------------------------
let solution2 = null;

class InstructionsParser2 extends InstructionsParser {
  updateOffset() {
    const { value, offset } = this.currentInstruction;
    if (value + offset >= 3) {
      this.currentInstruction.offset -= 1;
    } else {
      this.currentInstruction.offset += 1;
    }
  }
}

const parser2 = new InstructionsParser2(input);
parser2.parse();

console.log('Part 2:', parser2.stepCount);