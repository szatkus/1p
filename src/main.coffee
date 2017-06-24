import {Game} from './game.js';

window.addEventListener 'load', () ->
    canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    game = new Game(canvas)
