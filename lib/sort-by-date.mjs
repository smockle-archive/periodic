// @flow
/*:: import type { UppercaseParsedRow, LowercaseParsedRow } from './types' */

import getDate from './get-date'
import sortBy from 'lodash/sortBy'

const sortByDate /*: (Array<UppercaseParsedRow> => Array<UppercaseParsedRow>) & (Array<LowercaseParsedRow> => Array<LowercaseParsedRow>) */ = x => {
  return sortBy(x, [
    (x /*: UppercaseParsedRow | LowercaseParsedRow */) => getDate(x)
  ])
}

export default sortByDate
