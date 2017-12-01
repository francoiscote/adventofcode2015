const input = require('./input');
const { splitInt } = require('../../utils/strings');

const numbers = splitInt(input);

let solution = 0;

numbers.forEach((value, index) => {
  const compareToIndex = (index === numbers.length-1) ? 0 : index+1;
  solution += (value === numbers[compareToIndex]) ? value : 0;
});

console.log('Part 1:', solution);