import { getRangeInMonths } from "../src/lib/get-range-in-months.mjs";

describe("getRangeInMonths", () => {
  test("one month, same year", () => {
    expect(getRangeInMonths(new Date(2016, 12), new Date(2016, 12))).toEqual(1);
  });
  test("two months, same year", () => {
    expect(getRangeInMonths(new Date(2016, 11), new Date(2016, 12))).toEqual(2);
  });
  test("two months", () => {
    expect(getRangeInMonths(new Date(2016, 12), new Date(2017, 1))).toEqual(2);
  });
  test("three months", () => {
    expect(getRangeInMonths(new Date(2016, 12), new Date(2017, 2))).toEqual(3);
  });
  test("twelve months", () => {
    expect(getRangeInMonths(new Date(2016, 12), new Date(2017, 11))).toEqual(
      12
    );
  });
  test("thirteen months", () => {
    expect(getRangeInMonths(new Date(2016, 12), new Date(2017, 12))).toEqual(
      13
    );
  });
  test("fourteen months", () => {
    expect(getRangeInMonths(new Date(2016, 12), new Date(2018, 1))).toEqual(14);
  });
});
