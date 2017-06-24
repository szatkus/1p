export class BasicObject
    constructor: (properties) ->
        @x = 0
        @y = 0
        @width = 1
        @height = 1
        @color = '#000'
        for name, value of properties
            this[name] = value
