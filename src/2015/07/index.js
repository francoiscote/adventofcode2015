const input07 = require('./input').split('\n')

class InstructionsParser {
  constructor(input) {
    this.input = input
  }

  parse() {
    return this.input.map(instr => {
      const instruction = {}

      const splited = instr.split(' -> ')

      instruction[splited[1]] = {
        value: splited[0],
        answer: null,
        resolved: 0,
      }

      return instruction
    })
  }
}

const ip = new InstructionsParser(input07)
console.log(ip.parse())

// {
//   'ad': {
//     type: "operator"
//     value: "er OR ai"
//     answer: 123
//     resolved: 1
//   }
// }
//
// 'lf RSHIFT 1 -> ly'
// { 'ly':
//   value: 'lf RSHIFT 1'}
