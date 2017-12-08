const instructions = require('./input').split('\n');
const _ = require('lodash');

class InstructionsParser {
  constructor() {
    this.registers = {};
    this.highestValueEver = 0;
  }

  parseThis(inst) {
    inst.forEach((i) => {
      const regEx = /([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) ([=|!|<|>]+) (-?\d+)/;
      const [
        fullMatch,
        destKey,
        destOper,
        destValue,
        condKey,
        condOper,
        condValue,
      ] = i.match(regEx);

      const condition = this.checkCondition(condKey, condOper, condValue);

      if (condition) {
        this.applyOperation(destKey, destOper, destValue);
        this.checkHighestValueEver();
      }


    });

    return this;
  }

  checkHighestValueEver() {
    const largest = this.largestRegister;
    if (largest > this.highestValueEver) {
      console.log('New Higher Value Ever', largest);
      this.highestValueEver = largest;
    }
  }

  applyOperation(key, oper, value) {
    console.log('Apply', key, oper, value);

    const parsedValue = parseInt(value, 10);
    const regValue = this.getRegisterValue(key);
    switch (oper) {
      case 'inc':
        this.registers[key] = regValue + parsedValue;
        break;
      case 'dec':
        this.registers[key] = regValue - parsedValue;
        break;
      default:
        return false;
    }

    return true;
  }

  checkCondition(key, oper, value) {
    console.log('Check', key, oper, value);

    const parsedValue = parseInt(value, 10);
    const regValue = this.getRegisterValue(key);

    switch (oper) {
      case '==':
        return regValue == parsedValue;
      case '!=':
        return regValue != parsedValue;
      case '>=':
        return regValue >= parsedValue;
      case '>':
        return regValue > parsedValue;
      case '<=':
        return regValue <= parsedValue;
      case '<':
        return regValue < parsedValue;
      default:
        return false;
    }
  }

  getRegisterValue(key) {
    const reg = this.registers[key];
    if (!reg) {
      this.registers[key] = 0;
      return 0;
    }
    return reg;
  }

  get largestRegister() {
    const sorted = _.sortBy(this.registers);
    return sorted[sorted.length - 1];
  }
}




// -------------------------------------
// PART 1
// -------------------------------------
let solution1 = null;

const ip = new InstructionsParser();
ip.parseThis(instructions);

console.log('Part 1:', ip.largestRegister);

// -------------------------------------
// PART 2
// -------------------------------------
console.log('Part 2:', ip.highestValueEver);