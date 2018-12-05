const input = require('./input');
const { splitInt } = require('../../utils/strings');

const numbers = splitInt(input);

let solution1 = 0;
const getCompareIndexPart1 = (index, array) => {
  return (index === array.length - 1) ? 0 : index + 1;
}

let solution2 = 0;
const getCompareIndexPart2 = (index, array) => {
  return (index + (array.length / 2)) % array.length;
}

numbers.forEach((value, index) => {
  solution1 += (value === numbers[getCompareIndexPart1(index, numbers)]) ? value : 0;
  solution2 += (value === numbers[getCompareIndexPart2(index, numbers)]) ? value : 0;
});

console.log('Part 1:', solution1);
console.log('Part 2:', solution2);
