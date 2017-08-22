import getRangeInMonths from '../lib/get-range-in-months'
import test from 'tape'

test('getRangeInMonths', t => {
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2016, 12)),
    1,
    'one month, same year'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 11), new Date(2016, 12)),
    2,
    'two months, same year'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 1)),
    2,
    'two months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 2)),
    3,
    'three months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 11)),
    12,
    'twelve months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 12)),
    13,
    'thirteen months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2018, 1)),
    14,
    'fourteen months'
  )
  t.end()
})
