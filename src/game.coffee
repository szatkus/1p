export class Game
    constructor: (canvas) ->
        @width = canvas.width
        @height = canvas.height
        @context = canvas.getContext('2d')
