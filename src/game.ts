import { BasicObject } from "./objects"

export class Game {
    width: number
    height: number
    context: CanvasRenderingContext2D
    lastTimestamp: number = 0
    objects: BasicObject[] = []
    scale = 1
    camera: {x: number, y: number} = { x: 0, y: 0 }
    constructor (canvas: HTMLCanvasElement) {
        this.width = canvas.width
        this.height = canvas.height
        this.context = canvas.getContext('2d')!
    }

    start (map) {
        this.objects = map.objects
        this.scale = map.scale
        this.camera = map.camera
        this.step()
    }

    step () {
        let currentTimestamp = +new Date
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
