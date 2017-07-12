export class BasicObject
    constructor: (properties) ->
        @x = 0
        @y = 0
        @width = 1
        @height = 1
        @speed = 1
        @color = '#000'
        for name, value of properties
            this[name] = value
        @destinationX = @x
        @destinationY = @y

    step: (delta) ->
        if Math.abs(@x - @destinationX) < @speed * delta
            @x = @destinationX
        if @x > @destinationX
            @x -= @speed * delta
        if @x < @destinationX
            @x += @speed * delta

        if Math.abs(@y - @destinationY) < @speed * delta
            @y = @destinationY
        if @y > @destinationY
            @y -= @speed * delta
        if @y < @destinationY
            @y += @speed * delta

export class Player extends BasicObject
    constructor: (properties) ->
        super(properties)
        window.addEventListener 'keydown', (e) => @keydown(e)

    keydown: (event) ->
        if event.key == 'ArrowLeft'
            @destinationX = Math.round(@x) - 1
        if event.key == 'ArrowRight'
            @destinationX = Math.round(@x) + 1

        if event.key == 'ArrowUp'
            @destinationY = Math.round(@y) - 1
        if event.key == 'ArrowDown'
            @destinationY = Math.round(@y) + 1
