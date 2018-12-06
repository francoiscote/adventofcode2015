import { splitLines } from 'utils/strings';
import { compareValues } from 'utils/arrays';
import input from './input';

const IDs = splitLines(input);

const lettersMap = (id) => {
  const letters = id.split('');
  return letters.reduce((acc, current) => {
    if (!Object.keys(acc).includes(current)) {
      acc[current] = 1;
    } else {
      acc[current] += 1;
    }
    return acc;
  }, {});
};

const hasRepeating = (id, n) => Object.values(lettersMap(id)).includes(n);

// PART 1
const part1 = () => {
  const haveTwo = IDs.filter(id => hasRepeating(id, 2));
  const haveThree = IDs.filter(id => hasRepeating(id, 3));
  return haveTwo.length * haveThree.length;
};

console.log('Part 1:', part1());

// PART 2

const compareLetters = (id1, id2) => {
  const letters1 = id1.split('');
  const letters2 = id2.split('');

  return letters1.reduce((acc, letter, index) => {
    acc += letter === letters2[index] ? 0 : 1;
    return acc;
  }, 0);
};

const part2 = () => {
  let match = '';
  compareValues(IDs, (id1, id2) => {
    const diff = compareLetters(id1, id2);
    if (diff === 1) {
      match = `${id1} : ${id2}`;
    }
  });
  return match;
};

console.log('Part 2:', part2());
