import { getReturn } from "../src/lib/get-return.mjs";
import { round } from "lodash";

describe("getReturn", () => {
  test("positive return", () => {
    expect(round(getReturn(101.6569, 102.0835), 4)).toEqual(0.4196);
  });
  test("negative return", () => {
    expect(round(getReturn(102.0835, 101.6569), 4)).toEqual(-0.4179);
  });
  test("zero return", () => {
    expect(round(getReturn(100, 100), 4)).toEqual(0);
  });
});
