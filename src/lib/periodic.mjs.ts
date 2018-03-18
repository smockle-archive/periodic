import { ParsedRow, UppercaseParsedRow, UppercaseReturnRow } from "./types.mjs";

import { datedRowsToWorksheet } from "./dated-rows-to-worksheet.mjs";
import { getDate } from "./get-date.mjs";
import { getRangeInMonths } from "./get-range-in-months.mjs";
import { getReturn } from "./get-return.mjs";
import { parseCurrency } from "./parse-currency.mjs";
import { sortByDate } from "./sort-by-date.mjs";
import { transformDate } from "./transform-date.mjs";

import { findLast } from "lodash";
import { DateTime } from "luxon";
import * as util from "util";
import * as xlsx from "xlsx";

export interface IPeriodic {
  /** The collection of unparsed worksheets. */
  _workbook: { SheetNames: string[]; Sheets: { [key: string]: any } };
  /** The collection of unparsed rows. */
  _worksheet: { [key: string]: any };
  /** The collection of parsed row objects. */
  value: ParsedRow[];
  /** Returns the collection of parsed row objects. */
  valueOf(): ParsedRow[];
  /** Returns a formatted representation of the parsed row objects. */
  inspect(): string | null | undefined;
  /** Returns the collection of parsed row objects as JSON. */
  toJSON(): string | null;
  /** Returns a collection of months and the NAV associated with each. */
  getMonthlyNAV(): UppercaseParsedRow[];
  /** Returns a collection of months and the return (since the previous month) associated with each. */
  getMonthlyReturn(): UppercaseReturnRow[];
  /** Writes the collection of months and monthly return to an XLSX file. */
  exportMonthlyReturn(workbookPath: string): void;
}

export class Periodic implements IPeriodic {
  _workbook: { SheetNames: string[]; Sheets: { [key: string]: any } };
  _worksheet: { [key: string]: any };
  value: ParsedRow[];

  constructor(workbookPath: string) {
    this._workbook = xlsx.readFile(workbookPath);
    const worksheetName: string = this._workbook.SheetNames[0];
    this._worksheet = this._workbook.Sheets[worksheetName];
    this.value = xlsx.utils
      .sheet_to_json<ParsedRow>(this._worksheet)
      .map(x => transformDate(x));
  }

  valueOf(): ParsedRow[] {
    return this.value;
  }

  inspect(): string | null | undefined {
    if (!this.value) {
      return;
    }
    const content: string =
      this.value.reduce(
        (xs: string, x: ParsedRow, i: number) =>
          `${xs}${i !== 0 ? "\n" : ""}  ${util.inspect(x)}${
            i !== this.value.length - 1 ? "," : ""
          }`,
        ""
      ) || "";
    return `Periodic([\n${content}\n])`.replace(/\n(\n)+/g, "");
  }

  toJSON(): string {
    return JSON.stringify(this.value);
  }

  getMonthlyNAV(): UppercaseParsedRow[] {
    const dates: ParsedRow[] = sortByDate(this.value);
    const startDate: Date = getDate(dates[0]);
    const endDate: Date = getDate(dates[dates.length - 1]);
    const length: number = getRangeInMonths(startDate, endDate);
    return Array.from({ length }).reduce(
      (xs: UppercaseParsedRow[], x, i: number) => {
        // last date in the month
        const query: string = DateTime.fromJSDate(startDate)
          .plus({ months: i })
          .endOf("month")
          .toFormat("yyyy-MM");
        // data from last date in the month
        const match = findLast(
          dates,
          (x: ParsedRow) =>
            DateTime.fromJSDate(getDate(x)).toFormat("yyyy-MM") === query
        );
        if (!match) {
          return xs;
        }
        return xs.concat({ Date: getDate(match), NAV: match.NAV });
      },
      []
    );
  }

  getMonthlyReturn(): UppercaseReturnRow[] {
    const monthlyNAV = this.getMonthlyNAV();
    return monthlyNAV.reduce(
      (xs: UppercaseReturnRow[], x: UppercaseParsedRow, i: number) => {
        // Short-circuit in the first month
        if (i === 0) {
          return xs;
        }
        return xs.concat({
          Date: x.Date,
          Return: getReturn(
            parseCurrency(monthlyNAV[i - 1].NAV),
            parseCurrency(x.NAV)
          )
        });
      },
      []
    );
  }

  exportMonthlyReturn(workbookPath: string): undefined {
    const monthlyReturn = this.getMonthlyReturn();
    // Short-circuit if montlyReturn is empty
    if (!monthlyReturn || !monthlyReturn.length) {
      return;
    }
    xlsx.writeFile(
      {
        SheetNames: ["Monthly Returns"],
        Sheets: {
          "Monthly Returns": datedRowsToWorksheet(monthlyReturn)
        }
      },
      workbookPath
    );
  }
}
