import Matrix from 'utils/matrix';
import { splitLines } from 'utils/strings';
import input from './input';

// -------------------------------------
// PART 1
// -------------------------------------

const m = new Matrix(1000, 1000, 0);

const parsedInput = splitLines(input, (string) => {
  const [id, rest] = string.split('@').map(v => v.trim());
  const [start, dimensions] = rest.split(': ').map(v => v.trim());
  const [x, y] = start.split(',').map(v => parseInt(v, 10));
  const [w, h] = dimensions.split('x').map(v => parseInt(v, 10));

  return {
    id,
    x,
    y,
    w,
    h,
  };
});

parsedInput.forEach((section) => {
  m.setSection({
    value: v => v + 1,
    ...section,
  });
});

let solution1 = 0;
m.loopThrough({}, (x, y) => {
  if (m.getValue(x, y) > 1) {
    solution1 += 1;
  }
});

console.log('Part 1:', solution1);

// -------------------------------------
// PART 2
// -------------------------------------
const intactSection = m.getSections().filter((section) => {
  let valid = true;
  m.loopThrough(section, (x, y) => {
    if (m.getValue(x, y) > 1) {
      valid = false;
    }
  });
  return valid;
});

console.log('Part 2:', intactSection[0].id);
