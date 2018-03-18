import { UnparsedRow, ParsedRow } from "./types.mjs";
import { getDate } from "./get-date.mjs";

/**
 * Mutates the value of a row object’s '(D|d)ate' field, converting a string date to a Date object.
 * @param x The row object with a '(D|d)ate' field.
 */
export function transformDate<T extends ParsedRow | UnparsedRow>(x: T): T {
  if (!x.hasOwnProperty("Date") && !x.hasOwnProperty("date")) {
    return x;
  }
  const key: "Date" | "date" = x.hasOwnProperty("Date") ? "Date" : "date";
  const date = new Date(getDate(x));
  x[key] = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0
    )
  );
  return x;
}
