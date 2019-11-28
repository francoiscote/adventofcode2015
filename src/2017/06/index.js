const input = require('./input')

// -------------------------------------
// PART 1
// -------------------------------------
class MemoryManager {
  constructor(blocks) {
    // save blocks as array of integers
    this.blocks = blocks.split('\t').map(m => parseInt(m, 10))
    this.states = []
    this.duplicatedIndex = null
  }

  repair() {
    let duplicatedState = false

    while (!duplicatedState) {
      const stateHash = this.currentStateHash
      const duplicatedIndex = this.states.indexOf(stateHash)

      if (duplicatedIndex > -1) {
        duplicatedState = true
        this.duplicatedIndex = duplicatedIndex
      } else {
        this.saveState(stateHash)
        this.redistribute(this.firstBiggestBlockIndex)
      }
    }
    console.log(`Memory Repair done.`)
  }

  redistribute(fromIndex) {
    const blocks = this.blocks[fromIndex]
    this.blocks[fromIndex] = 0

    for (let i = 1; i <= blocks; i += 1) {
      // loop around
      const nextIndex = (fromIndex + i) % this.blocks.length

      this.blocks[nextIndex] += 1
    }
  }

  saveState(state) {
    this.states.push(state)
  }

  get currentStateHash() {
    return this.blocks.join('-')
  }

  get firstBiggestBlockIndex() {
    const bigValue = Math.max(...this.blocks)
    return this.blocks.findIndex(b => b === bigValue)
  }

  get redisAmount() {
    return this.states.length
  }

  get loopSize() {
    return this.redisAmount - this.duplicatedIndex
  }
}

const mem = new MemoryManager(input)
mem.repair()

console.log('Part 1:', mem.redisAmount)

// -------------------------------------
// PART 2
// -------------------------------------
console.log('Part 2:', mem.loopSize)
