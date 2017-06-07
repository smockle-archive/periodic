#!/usr/bin/env node
const path = require('path')
const { Periodic } = require('./lib')
const { version } = require('./package.json')

const input /*: string */ = process.argv.slice(2)[0]
const output /*: string */ = process.argv.slice(2)[1]

if (!input || !output) {
  console.log(`periodic
v${version}
Convert monthly price data to monthly return data

Usage:
  $ periodic input_file output_file

Examples:
  $ periodic "/path/to/input/file.xlsx" "/path/to/output/file.xlsx"`)
} else {
  const periodic /*: Periodic */ = new Periodic(path.resolve(input))
  periodic.exportMonthlyReturn(path.resolve(output))
}
