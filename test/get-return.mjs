import getReturn from '../lib/get-return'
import test from 'tape'
import round from 'lodash/round'

test('getReturn', t => {
  t.equal(round(getReturn(101.6569, 102.0835), 4), 0.4196, 'positive return')
  t.equal(round(getReturn(102.0835, 101.6569), 4), -0.4179, 'negative return')
  t.equal(round(getReturn(100, 100), 4), 0, 'zero return')
  t.end()
})
