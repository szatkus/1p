export class Game
    constructor: (canvas) ->
        @width = canvas.width
        @height = canvas.height
        @context = canvas.getContext('2d')

    start: (map) ->
        @objects = map.objects
        @scale = map.scale
        @camera = map.camera
        @step()

    step: () ->
        @draw()
        requestAnimationFrame () =>
            @step()

    draw: () ->
        @context.resetTransform()
        @context.clearRect 0, 0, @width, @height
        @context.scale @scale, @scale
        @context.translate @width / @scale / 2 - @camera.x, @height / @scale / 2 - @camera.y
        for obj in @objects
            @context.fillRect obj.x, obj.y, obj.width, obj.height
