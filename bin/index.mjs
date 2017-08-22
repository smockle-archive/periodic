#!/usr/bin/env node
// @flow

import { Periodic } from '../lib/index'
import fs from 'fs'
import path from 'path'

// TODO: Replace this when `import.meta` is accepted: https://github.com/tc39/proposal-import-meta
// See also: https://github.com/standard-things/esm/issues/52
const dirname = __dirname

const input /*: string */ = process.argv.slice(2)[0]
const output /*: string */ = process.argv.slice(2)[1]

function getVersion () /*: string */ {
  const filename = path.resolve(dirname, '../package.json')
  const raw = fs.readFileSync(filename, 'utf8')
  if (!raw) {
    return ''
  }
  const packageInfo /*: { version: string, [string]: any } */ = JSON.parse(raw)
  return packageInfo.version
}

if (!input || !output) {
  console.log(`periodic
v${getVersion()}
Convert monthly price data to monthly return data

Usage:
  $ periodic input_file output_file

Examples:
  $ periodic "/path/to/input/file.xlsx" "/path/to/output/file.xlsx"`)
} else {
  const periodic /*: Periodic */ = new Periodic(path.resolve(input))
  periodic.exportMonthlyReturn(path.resolve(output))
}
