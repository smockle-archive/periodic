/**
 * Returns the number of months between two dates.
 * @param startDate The starting date.
 * @param endDate The ending date.
 */
export function getRangeInMonths(startDate: Date, endDate: Date): number {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() + 1) -
    startDate.getMonth()
  );
}
