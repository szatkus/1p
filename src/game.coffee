export class Game
    constructor: (canvas) ->
        @width = canvas.width
        @height = canvas.height
        @context = canvas.getContext('2d')

    start: (map) ->
        @objects = map.objects
        @scale = map.scale
        @step()

    step: () ->
        @draw()
        requestAnimationFrame () =>
            @step()

    draw: () ->
        @context.resetTransform()
        @context.scale @scale, @scale
        @context.clearRect 0, 0, @width, @height
        for obj in @objects
            @context.fillRect obj.x, obj.y, obj.width, obj.height
