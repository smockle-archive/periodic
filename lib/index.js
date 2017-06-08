// @flow

const { findLast, get, sortBy } = require('lodash')
const moment = require('moment')
const util = require('util')
const xlsx = require('xlsx')

/*:: type row = {
  date?: string | Date,
  Date?: string | Date,
  [string]: any
}
*/

/*:: type datedRow = {
  date?: Date,
  Date?: Date,
  [string]: any
}
*/

function transformDate (x /*: {
  [string]: any
} */) /*: datedRow */ {
  if (x.hasOwnProperty('Date')) {
    const date = new Date(x.Date)
    x.Date = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        0,
        0,
        0
      )
    )
  }
  if (x.hasOwnProperty('date')) {
    const date = new Date(x.date)
    x.date = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        0,
        0,
        0
      )
    )
  }
  return x
}

// prettier-ignore
function getDate (x /*: datedRow */) /*: ?Date | ?string */ {
  switch (true) {
    case x.hasOwnProperty('Date'):
      return x.Date
    case x.hasOwnProperty('date'):
      return x.date
    default:
      return undefined
  }
}

function getRangeInMonths (
  startDate /*: Date */,
  endDate /*: Date */
) /*: number */ {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() + 1) -
    startDate.getMonth()
  )
}

function sortByDate (x /*: Array<datedRow> */) /*: Array<datedRow> */ {
  return sortBy(x, [x => x.Date || x.date])
}

function parseCurrency (x /*: string */) /*: number */ {
  return parseFloat(x.replace('$', ''), 10)
}

function getReturn (x /*: number */, y /*: number */) /*: number */ {
  return (y - x) / x * 100
}

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
  datedRows /*: Array<datedRow> */
) /*: Worksheet */ {
  const cells = datedRows.reduce(
    (xs /*: {[string]: any} */, x /*: datedRow */, i /*: number */) => {
      xs[`A${i + 1}`] = { t: 'd', v: x.Date }
      xs[`B${i + 1}`] = { t: 'n', v: x.Return }
      return xs
    },
    {}
  )
  const ref = `A1:B${datedRows.length}`
  return Object.assign(cells, { '!ref': ref })
}

/*:: interface IPeriodic {
  _workbook: {};
  _worksheet: {};
  value: Array<datedRow>;
  valueOf(): Array<datedRow>;
  inspect(): ?string;
  toJSON(): ?string;
  getMonthlyNAV(): ?Array<datedRow>;
  getMonthlyReturn(): ?Array<datedRow>;
}
*/

class Periodic /*:: implements IPeriodic */ {
  /*:: _workbook: {} */
  /*:: _worksheet: {} */
  /*:: value: Array<datedRow> */

  constructor (workbookPath /*: string */) {
    this._workbook = xlsx.readFile(workbookPath)
    const worksheetName /*: string */ = get(this._workbook, 'SheetNames.0')
    this._worksheet = get(this._workbook, `Sheets.${worksheetName}`)
    this.value = xlsx.utils.sheet_to_json(this._worksheet).map(transformDate)
  }

  // prettier-ignore
  valueOf () /*: Array<datedRow> */ {
    return this.value
  }

  // prettier-ignore
  inspect () /*: ?string */ {
    if (!this.value) {
      return
    }
    const content /*: string */ = this.value.reduce(
      (xs /*: string */, x /*: datedRow */, i /*: number */) =>
        `${xs}${i !== 0 ? '\n' : ''}  ${util.inspect(x)}${i !== this.value.length - 1 ? ',' : ''}`,
      ''
    ) || ''
    return `Periodic([\n${content}\n])`.replace(/\n(\n)+/g, '')
  }

  // prettier-ignore
  toJSON () /*: string */ {
    return JSON.stringify(this.value)
  }

  // prettier-ignore
  getMonthlyNAV () /*: ?Array<datedRow> */ {
    const dates /*: Array<datedRow> */ = sortByDate(this.value)
    const startDate /*: ?Date */ = ((getDate(dates[0])/*: any */)/*: ?Date */)
    const endDate /*: ?Date */ = ((getDate(dates[dates.length - 1])/*: any */)/*: ?Date */)
    if (!startDate || !endDate) { return }
    const length /*: number */ = getRangeInMonths(startDate, endDate)
    return Array.from({length}).map((x, i /*: number */) => {
      // last date in the month
      const query = moment(startDate).add(i, 'M').endOf('M').format('YYYY-MM')
      // data from last date in the month
      const match /*: datedRow */ = ((findLast(dates, (x) => moment(getDate(x)).format('YYYY-MM') === query)/*: any */)/*: datedRow */)
      return { Date: ((getDate(match)/*: any */)/*: Date */), NAV: match.NAV }
    })
  }

  // prettier-ignore
  getMonthlyReturn () /*: ?Array<datedRow> */ {
    const monthlyNAV = (((this.getMonthlyNAV() || []) /*: any */) /*: Array<datedRow> */)
    return monthlyNAV.reduce(
      (xs /*: Array<datedRow> */, x /*: datedRow */, i /*: number */) => {
        // Short-circuit in the first month
        if (i === 0) {
          return xs
        }
        return xs.concat({
          Date: x.Date,
          Return: getReturn(
            parseCurrency(monthlyNAV[i - 1].NAV),
            parseCurrency(x.NAV)
          )
        })
      },
      []
    )
  }

  exportMonthlyReturn (workbookPath /*: string */) {
    const monthlyReturn = this.getMonthlyReturn()
    // Short-circuit if montlyReturn is empty
    if (!monthlyReturn || !monthlyReturn.length) {
      return
    }
    xlsx.writeFile(
      {
        SheetNames: ['Monthly Returns'],
        Sheets: {
          'Monthly Returns': datedRowsToWorksheet(monthlyReturn)
        }
      },
      workbookPath
    )
  }
}

module.exports = {
  Periodic,
  sortByDate,
  getRangeInMonths,
  getReturn,
  parseCurrency,
  datedRowsToWorksheet
}
