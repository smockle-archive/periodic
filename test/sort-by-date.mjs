import sortByDate from '../lib/sort-by-date'
import test from 'tape'

test('sortByDate', t => {
  t.deepEqual(
    sortByDate([
      { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: '$101.2887' },
      { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: '$101.2731' },
      { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: '$101.2539' }
    ]),
    [
      { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: '$101.2539' },
      { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: '$101.2731' },
      { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: '$101.2887' }
    ],
    'initially sorted'
  )

  t.deepEqual(
    sortByDate([
      { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: '$101.2731' },
      { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: '$101.2887' },
      { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: '$101.2539' }
    ]),
    [
      { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: '$101.2539' },
      { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: '$101.2731' },
      { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: '$101.2887' }
    ],
    'initially unsorted'
  )
  t.end()
})
