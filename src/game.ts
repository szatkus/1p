import { BasicObject } from './objects'

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

export class Game {
  width: number
  height: number
  context: CanvasRenderingContext2D
  lastTimestamp: number = 0
  objects: BasicObject[] = []
  scale = 1
  camera: {x: number, y: number} = { x: 0, y: 0 }
  randomVector: number[] = []
  constructor (canvas: HTMLCanvasElement) {
    this.width = canvas.width
    this.height = canvas.height
    this.context = canvas.getContext('2d')!
  }

  start (map) {
    this.initRandomness()
    this.objects = map.objects
    this.scale = map.scale
    this.camera = map.camera
    this.step()
  }

  initRandomness () {
    if (!localStorage['seed']) {
      let randomVector = generateRandomVector(78697)
      localStorage['seed'] = randomVector
    }
    this.randomVector = localStorage['seed'].split(',').map(x => parseInt(x))
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
    for (let obj of this.objects) {
      this.context.fillRect(Math.round(obj.x), Math.round(obj.y), obj.width, obj.height)
    }
  }
}
