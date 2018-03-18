import { parseCurrency } from "../src/lib/parse-currency.mjs";
import { round } from "lodash";

describe("parseCurrency", () => {
  test("with cents", () => {
    expect(round(parseCurrency("$101.6569"), 4)).toEqual(101.6569);
  });
  test("without cents", () => {
    expect(round(parseCurrency("$101"), 4)).toEqual(101);
  });
  test("zero", () => {
    expect(round(parseCurrency("$0.0000"), 4)).toEqual(0);
  });
});
