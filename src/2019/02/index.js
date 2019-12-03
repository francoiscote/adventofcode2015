/* eslint-disable no-unused-vars */

import _ from 'lodash'

import { split } from 'utils/strings'
import input from './input'

const codes = split(input, ',', v => parseInt(v, 10))

const runInstructions = (allCodes, index) => {
  const instructions = allCodes.slice(index, index + 4)
  const operation = instructions[0]
  const address = instructions[3]

  if (operation === 99) {
    return false
  }

  let calculatedValue
  if (operation === 1) {
    calculatedValue = allCodes[instructions[1]] + allCodes[instructions[2]]
  } else if (operation === 2) {
    calculatedValue = allCodes[instructions[1]] * allCodes[instructions[2]]
  } else {
    throw new Error('Encountered Invalid Opcode')
  }

  const newCodes = allCodes
  newCodes[address] = calculatedValue

  return newCodes
}

const runProgram = program => {
  let memory = program.slice(0)
  let instructionsPointer = 0
  let running = true

  while (running) {
    const newCodes = runInstructions(memory, instructionsPointer)

    if (!newCodes) {
      running = false
      break
    }
    memory = newCodes
    instructionsPointer += 4
  }

  return memory
}

/** Part 1 */
const firstPartCodes = codes
firstPartCodes[1] = 12
firstPartCodes[2] = 2

const firstPartSolution = runProgram(firstPartCodes)
console.log('Part 1', firstPartSolution[0])

/** Part 2 */
for (let noun = 0; noun <= 99; noun += 1) {
  for (let verb = 0; verb <= 99; verb += 1) {
    const secondPartCodes = codes
    secondPartCodes[1] = noun
    secondPartCodes[2] = verb

    const secondPartTry = runProgram(secondPartCodes)
    if (secondPartTry[0] === 19690720) {
      console.log('Part2', 100 * noun + verb)
    }
  }
}
