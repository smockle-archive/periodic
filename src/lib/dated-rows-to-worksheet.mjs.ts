import { UppercaseReturnRow } from "./types.mjs";

export type Cell = {
  [key: string]: any;
  t: "b" | "n" | "e" | "s" | "d";
  v: any;
};

export type Worksheet =
  | {
      "!ref": string;
    }
  | { [key: string]: Cell };

export function datedRowsToWorksheet(
  datedRows: Array<UppercaseReturnRow>
): Worksheet {
  const cells = datedRows.reduce(
    (xs: { [key: string]: any }, x: UppercaseReturnRow, i: number) => {
      xs[`A${i + 1}`] = { t: "d", v: x.Date };
      xs[`B${i + 1}`] = { t: "n", v: x.Return };
      return xs;
    },
    {}
  );
  const ref = `A1:B${datedRows.length}`;
  return Object.assign(cells, { "!ref": ref });
}
