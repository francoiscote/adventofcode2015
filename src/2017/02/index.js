const rows = require('./input').split('\n')
const { combinations } = require('../../utils/arrays')

// -------------------------------------
// PART 1
// -------------------------------------
const solution1 = rows.reduce((total, row) => {
  const numbers = row.split('\t')
  return total + (Math.max(...numbers) - Math.min(...numbers))
}, 0)

console.log(`Part 1: ${solution1}`)

// -------------------------------------
// PART 2
// -------------------------------------
const solution2 = rows.reduce((total, row) => {
  const numbers = row.split('\t')

  let rowDiv = 0

  const tryDivision = (e1, e2) => {
    if (e1 !== e2 && e1 % e2 === 0) {
      rowDiv = e1 / e2
    }
  }

  combinations(numbers, tryDivision)
  combinations(numbers.reverse(), tryDivision)

  return total + rowDiv
}, 0)

console.log(`Part 2: ${solution2}`)
