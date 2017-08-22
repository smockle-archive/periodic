// @flow
/*:: import type { UppercaseReturnRow } from './types' */

/*:: type Cell = {
  [string]: any,
  't': 'b' | 'n' | 'e' | 's' | 'd',
  'v': any
}
*/

/*:: type Worksheet = {
  [string]: Cell,
  '!ref': string
}
*/

function datedRowsToWorksheet (
  datedRows /*: Array<UppercaseReturnRow> */
) /*: Worksheet */ {
  const cells = datedRows.reduce((
    xs /*: {[string]: any} */,
    x /*: UppercaseReturnRow */,
    i /*: number */
  ) => {
    xs[`A${i + 1}`] = { t: 'd', v: x.Date }
    xs[`B${i + 1}`] = { t: 'n', v: x.Return }
    return xs
  }, {})
  const ref = `A1:B${datedRows.length}`
  return Object.assign(cells, { '!ref': ref })
}

export default datedRowsToWorksheet
