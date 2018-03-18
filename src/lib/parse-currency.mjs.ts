/**
 * Parses an argument and returns a floating point number.
 * @param x The value to parse, e.g. "$12.34".
 */
export function parseCurrency(x: string): number {
  return parseFloat(x.replace("$", ""));
}
