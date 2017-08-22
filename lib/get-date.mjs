// @flow
/*:: import type { ParsedRow, UnparsedRow } from './types' */

// prettier-ignore
const getDate /*: (x: ParsedRow) => Date & ((x: UnparsedRow) => number | string) */ = (x) => {
  const key /*: 'Date' | 'date' */ = x.hasOwnProperty('Date') ? 'Date' : 'date'
  return x[key]
}

export default getDate
