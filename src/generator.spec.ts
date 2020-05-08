import { getRandom } from './random'
import { expect } from 'chai'
import { Generator } from './generator'

it('Generate some map', () => {
  (global as any).localStorage = {}
  let r = getRandom()
  let m = (new Generator(r, 100)).generateMap()
  for (let y = 0; y < 100; y++) {
    let line = ''
    for (let x = 0; x < 100; x++) {
      line += m[y * 100 + x] ? ' ' : 'X'
    }
    console.log(line)
  }
})
