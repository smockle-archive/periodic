// @flow
/*:: import type { UnparsedRow, ParsedRow } from './types' */

import getDate from './get-date'

function transformDate (x /*: UnparsedRow */) /*: ParsedRow */ {
  if (!x.hasOwnProperty('Date') && !x.hasOwnProperty('date')) {
    return x
  }
  const key /*: 'Date' | 'date' */ = x.hasOwnProperty('Date') ? 'Date' : 'date'
  const date = new Date(getDate(x))
  x[key] = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0
    )
  )
  return x
}

export default transformDate
