import { Random } from './random'

interface Point {
  x: number,
  y: number
}

export class Generator {
  constructor (private random: Random, private size: number) {}

  generateMap () {
    let map: boolean[] = []
    for (let i = 1; i < this.size ** 2; i++) {
      map[i] = false
    }
    for (let i = 1; i < this.size - 1; i++) {
      map[i * this.size + (this.size / 2)] = true
      map[i + (this.size / 2) * this.size] = true
    }

    return map
  }

  private getRandomPoint (): Point {
    return {
      x: this.random.getInt(this.size),
      y: this.random.getInt(this.size)
    }
  }

  private getBorderPoint (): Point {
    let side = this.random.getInt(4)
    if (side === 1) {
      return {
        x: this.random.getInt(this.size),
        y: 0
      }
    }
    if (side === 2) {
      return {
        x: 0,
        y: this.random.getInt(this.size)
      }
    }
    if (side === 3) {
      return {
        x: this.size - 1,
        y: this.random.getInt(this.size)
      }
    }
    return {
      x: this.random.getInt(this.size),
      y: this.size - 1
    }
  }

}
