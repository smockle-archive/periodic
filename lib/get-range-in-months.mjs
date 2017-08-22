// @flow

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

export default getRangeInMonths
