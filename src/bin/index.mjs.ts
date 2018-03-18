#!/usr/bin/env node
import { Periodic } from "../lib/index.mjs";
import { readFileSync } from "fs";
import { resolve } from "path";

// TODO: Replace this when `import.meta` is accepted: https://github.com/tc39/proposal-import-meta
// See also: https://github.com/standard-things/esm/issues/52
const dirname: string = __dirname;

const input: string = process.argv.slice(2)[0];
const output: string = process.argv.slice(2)[1];

function getVersion(): string | undefined {
  const filename: string = resolve(dirname, "../../package.json");
  const raw: string = readFileSync(filename, "utf8");
  if (!raw) {
    return;
  }
  const packageInfo: { version: string } = JSON.parse(raw);
  return packageInfo.version;
}

if (!input || !output) {
  console.log(`periodic
v${getVersion()}
Convert monthly price data to monthly return data

Usage:
  $ periodic input_file output_file

Examples:
  $ periodic "/path/to/input/file.xlsx" "/path/to/output/file.xlsx"`);
} else {
  const periodic: Periodic = new Periodic(resolve(input));
  periodic.exportMonthlyReturn(resolve(output));
}
