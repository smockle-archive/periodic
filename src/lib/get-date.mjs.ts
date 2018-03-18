import { ParsedRow, UnparsedRow } from "./types.mjs";

/**
 * Returns the value of a Row object’s '(D|d)ate' field.
 * @param x The Row object.
 */
export function getDate<T extends ParsedRow | UnparsedRow>(
  x: T
): T extends ParsedRow ? Date : number | string {
  const key: "Date" | "date" = x.hasOwnProperty("Date") ? "Date" : "date";
  return x[key];
}
