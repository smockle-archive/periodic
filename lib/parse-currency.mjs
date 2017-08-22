// @flow

function parseCurrency (x /*: string */) /*: number */ {
  return parseFloat(x.replace('$', ''))
}

export default parseCurrency
