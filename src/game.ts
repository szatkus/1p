import { BasicObject, Player } from './objects'
import { Random, getRandom } from './random'
import { Generator } from './generator'

export class Game {
  width: number
  height: number
  context: CanvasRenderingContext2D
  lastTimestamp: number = 0
  objects: BasicObject[] = []
  scale = 64
  camera: {x: number, y: number} = { x: 0, y: 0 }
  random: Random = new Random([])
  constructor (canvas: HTMLCanvasElement) {
    this.width = canvas.width
    this.height = canvas.height
    this.context = canvas.getContext('2d')!
  }

  start () {
    this.random = getRandom()

    let player = new Player({ x: 500, y: 4, speed: 3 })
    let generator = new Generator(this.random, 1000)

    this.objects = generator.generateMap().map((value, index) => !value ? new BasicObject({ x: index % 1000, y: Math.floor(index / 1000) }) : null).filter(v => v !== null).concat([player]) as BasicObject[]
    this.camera = player
    this.step()
  }

  step () {
    let currentTimestamp = +new Date()
    if (this.lastTimestamp === 0) {
      this.lastTimestamp = currentTimestamp
    }
    let delta = (currentTimestamp - this.lastTimestamp) / 1000
    this.lastTimestamp = currentTimestamp
    for (let obj of this.objects) {
      obj.step(delta)
    }
    this.draw()
    requestAnimationFrame(() => this.step())
  }

  draw () {
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.scale(this.scale, this.scale)
    this.context.translate(this.width / this.scale / 2 - Math.round(this.camera.x), this.height / this.scale / 2 - Math.round(this.camera.y))
    let left = this.camera.x - this.width / this.scale
    let top = this.camera.y - this.height / this.scale
    let right = this.camera.x + this.width / this.scale
    let bottom = this.camera.y + this.height / this.scale
    for (let obj of this.objects) {
      if (obj.x + obj.width >= left && obj.x + obj.height >= top && obj.x <= right && obj.y <= bottom) {
        this.context.fillRect(Math.round(obj.x), Math.round(obj.y), obj.width, obj.height)
      }
    }
  }
}
