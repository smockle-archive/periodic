/**
 * Returns the percentage change between a previous and a current value.
 * @param x The previous value.
 * @param y The current value.
 */
export function getReturn(x: number, y: number): number {
  return (y - x) / x * 100;
}
