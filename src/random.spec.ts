import { Random } from './random'
import { expect } from 'chai'

it('Check uniform distribution', () => {
  let r = new Random([1, 5, 4, 6, 8, 7, 0, 9, 2, 3])
  let f = [0, 0, 0, 0, 0]
  for (let i = 0; i < 100000; i++) {
    f[r.getInt(5)]++
  }
  expect(f).to.eql([20000, 20000, 20000, 20000, 20000])
})
