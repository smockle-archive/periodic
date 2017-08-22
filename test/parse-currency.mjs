import parseCurrency from '../lib/parse-currency'
import test from 'tape'
import round from 'lodash/round'

test('parseCurrency', t => {
  t.equal(round(parseCurrency('$101.6569'), 4), 101.6569, 'with cents')
  t.equal(round(parseCurrency('$101'), 4), 101, 'without cents')
  t.equal(round(parseCurrency('$0.0000'), 4), 0, 'zero')
  t.end()
})
