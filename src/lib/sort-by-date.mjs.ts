import { ParsedRow } from "./types.mjs";
import { getDate } from "./get-date.mjs";
import { sortBy } from "lodash";

/**
 * Creates an array of row objects, sorted in ascending order by date.
 * @param x The collection of row objects to sort.
 */
export function sortByDate(x: ParsedRow[]): ParsedRow[] {
  return sortBy(x, [(x: ParsedRow) => getDate(x)]);
}
