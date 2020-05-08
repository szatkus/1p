export function getRandom (): Random {
  if (!localStorage['seed']) {
    let randomVector = generateRandomVector(78697)
    localStorage['seed'] = randomVector
    return new Random(randomVector)
  }
  return new Random(localStorage['seed'].split(',').map(x => parseInt(x)))
}

export class Random {
  size: number
  index = 0

  constructor (private randomVector: number[]) {
    this.size = randomVector.length
  }

  getInt (range: number): number {
    let result = this.getNext() % range
    let base = 1
    while (range > this.size) {
      range = Math.floor(range / this.size)
      base *= this.size
      result += (this.getNext() % range) * base
    }
    return result
  }

  roll (p: number): boolean {
    return (this.getNext() / this.size) < p
  }

  getBool (): boolean {
    return this.getInt(2) === 0
  }

  getNext () {
    if (this.index >= this.size) {
      this.index = 0
    }
    return this.randomVector[this.index++]
  }
}

function generateRandomVector (size: number): number[] {
  let numbers: number[] = []
  for (let i = 0; i < size; i++) {
    numbers[i] = i
  }
  let randomVector: number[] = []
  for (let i = 0; i < size; i++) {
    let index = Math.floor(Math.random() * numbers.length)
    randomVector[i] = numbers[index]
    numbers.splice(index, 1)
  }
  return randomVector
}
