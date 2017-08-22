// @flow
/*:: import type { ParsedRow, UppercaseParsedRow, UppercaseReturnRow } from './types' */

import datedRowsToWorksheet from './dated-rows-to-worksheet'
import getDate from './get-date'
import getRangeInMonths from './get-range-in-months'
import getReturn from './get-return'
import parseCurrency from './parse-currency'
import sortByDate from './sort-by-date'
import transformDate from './transform-date'

import findLast from 'lodash/findLast'
import moment from 'moment'
import util from 'util'
import xlsx from 'xlsx'

/*:: interface IPeriodic {
  _workbook: {};
  _worksheet: {};
  value: Array<ParsedRow>;
  valueOf(): Array<ParsedRow>;
  inspect(): ?string;
  toJSON(): ?string;
  getMonthlyNAV(): Array<UppercaseParsedRow>;
  getMonthlyReturn(): Array<UppercaseReturnRow>;
}
*/

class Periodic /*:: implements IPeriodic */ {
  /*:: _workbook: {} */
  /*:: _worksheet: {} */
  /*:: value: Array<ParsedRow> */

  constructor (workbookPath /*: string */) {
    this._workbook = xlsx.readFile(workbookPath)
    const worksheetName /*: string */ = this._workbook.SheetNames[0]
    this._worksheet = this._workbook.Sheets[worksheetName]
    this.value = xlsx.utils.sheet_to_json(this._worksheet).map(transformDate)
  }

  // prettier-ignore
  valueOf () /*: Array<ParsedRow> */ {
    return this.value
  }

  // prettier-ignore
  inspect () /*: ?string */ {
    if (!this.value) {
      return
    }
    const content /*: string */ = this.value.reduce(
      (xs /*: string */, x /*: ParsedRow */, i /*: number */) =>
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
  getMonthlyNAV () /*: Array<UppercaseParsedRow> */ {
    const dates /*: Array<ParsedRow> */ = sortByDate(this.value)
    const startDate /*: Date */ = getDate(dates[0])
    const endDate /*: Date */ = getDate(dates[dates.length - 1])
    const length /*: number */ = getRangeInMonths(startDate, endDate)
    return Array.from({length}).reduce((xs, x, i /*: number */) => {
      // last date in the month
      const query = moment(startDate).add(i, 'M').endOf('M').format('YYYY-MM')
      // data from last date in the month
      const match = findLast(dates, (x /*: ParsedRow */) => moment(getDate(x)).format('YYYY-MM') === query)
      if (!match) {
        return xs
      }
      return xs.concat({ Date: getDate(match), NAV: match.NAV })
    }, [])
  }

  // prettier-ignore
  getMonthlyReturn () /*: Array<UppercaseReturnRow> */ {
    const monthlyNAV = this.getMonthlyNAV()
    return monthlyNAV.reduce(
      (xs /*: Array<UppercaseReturnRow> */, x /*: UppercaseParsedRow */, i /*: number */) => {
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

export default Periodic
