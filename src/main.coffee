import {Game} from './game.js';
import firstMap from '../maps/start.js'

window.addEventListener 'load', () ->
    canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    game = new Game(canvas)
    game.start(firstMap)
