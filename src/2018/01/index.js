/* eslint no-restricted-syntax: "off", guard-for-in: "off" */
import { splitLines } from 'utils/strings'
import input from './input'

const parseOperation = operation => {
  const operator = operation.slice(0, 1)
  const value = parseInt(operation.slice(1), 10)

  return operator === '-' ? -1 * value : value
}

const inputArray = splitLines(input, parseOperation)

// PART 1
const total = inputArray.reduce((acc, current) => acc + current, 0)
console.log('PART 1:', total)

// PART 2
const history = []
let twiceValue = null

const findDuplicate = () => {
  inputArray.some(current => {
    const currentFrequency = history[history.length - 1] || 0
    const newFrequency = currentFrequency + current

    if (history.includes(newFrequency)) {
      twiceValue = newFrequency
      return true
    }
    history.push(newFrequency)
    return false
  })

  if (!twiceValue) {
    findDuplicate()
  }

  return twiceValue
}

console.log('PART 2:', findDuplicate())
