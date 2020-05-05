import {BasicObject, Player} from '../src/objects'

const player = new Player({x: 2, y: 2, speed: 3})

export default {
    scale: 64,
    camera: player,
    objects: [
        player,
        new BasicObject({x: 5, y: 5}),
        new BasicObject({x: 0, y: 0})
    ]
}
