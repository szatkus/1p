import {BasicObject} from '../src/objects.js'

player = new BasicObject {x: 2, y: 2}

export default
    scale: 64
    camera: player
    objects: [
        player
        new BasicObject {x: 5, y: 5}
        new BasicObject {x: 0, y: 0}
    ]
