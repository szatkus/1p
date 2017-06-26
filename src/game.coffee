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
        currentTimestamp = +new Date
        if not @lastTimestamp
            @lastTimestamp = currentTimestamp
        delta = (currentTimestamp - @lastTimestamp) / 1000
        @lastTimestamp = currentTimestamp
        for obj in @objects
            obj.step?(delta)
        @draw()
        requestAnimationFrame () =>
            @step()

    draw: () ->
        @context.resetTransform()
        @context.clearRect 0, 0, @width, @height
        @context.scale @scale, @scale
        @context.translate @width / @scale / 2 - Math.round(@camera.x), @height / @scale / 2 - Math.round(@camera.y)
        for obj in @objects
            @context.fillRect Math.round(obj.x), Math.round(obj.y), obj.width, obj.height
