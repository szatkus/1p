import { Game } from './game'
import firstMap from '../maps/start'

window.addEventListener('load', () => {
  let canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  let game = new Game(canvas)
  game.start()
})
