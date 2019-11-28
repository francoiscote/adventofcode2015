const input = require('./input').split('\n')

// PART 1
const part1 = input
  .filter(i => {
    const vowels = i.match(/[aeiou]/gi)
    if (vowels && vowels.length >= 3) {
      return true
    }
  })
  .filter(i => {
    return /(.)\1/g.test(i)
  })
  .filter(i => {
    return !/(ab|cd|pq|xy)/g.test(i)
  })

console.log(part1.length)

// PART 2
const part2 = input
  .filter(i => {
    return /(\w\w)\w*\1/g.test(i)
  })
  .filter(i => {
    return /(\w)\w{1}\1/g.test(i)
  })

console.log(part2.length)
