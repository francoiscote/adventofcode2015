/* eslint-disable no-unused-vars */
import _ from 'lodash'

import { splitLines } from 'utils/strings'
import input from './input'

const fuelForMass = m => Math.floor(m / 3) - 2

const calculatedMasses = splitLines(input, fuelForMass)

console.log(
  'Part 1:',
  calculatedMasses.reduce((a, b) => a + b, 0),
)

/* Part 2 */

const calculatedMassWithFuel = splitLines(input, m => {
  let moduleTotal = 0

  // Fuel for the Module
  const moduleFuel = fuelForMass(m)
  moduleTotal += moduleFuel

  // The Fuel for Fuel
  let fuelFuel = fuelForMass(moduleFuel)
  while (fuelFuel > 0) {
    moduleTotal += fuelFuel
    fuelFuel = fuelForMass(fuelFuel)
  }

  return moduleTotal
})

console.log(
  'Part 2:',
  calculatedMassWithFuel.reduce((a, b) => a + b, 0),
)
