import { datedRowsToWorksheet } from "../src/lib/dated-rows-to-worksheet.mjs";

describe("datedRowsToWorksheet", () => {
  test("datedRowsToWorksheet", () => {
    expect(
      datedRowsToWorksheet([
        {
          Date: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)),
          Return: 0.41964687099449977
        },
        {
          Date: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)),
          Return: 0.44061968878417784
        }
      ])
    ).toEqual({
      A1: { t: "d", v: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)) },
      B1: { t: "n", v: 0.41964687099449977 },
      A2: { t: "d", v: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)) },
      B2: { t: "n", v: 0.44061968878417784 },
      "!ref": "A1:B2"
    });
  });
});
