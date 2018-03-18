import { sortByDate } from "../src/lib/sort-by-date.mjs";

describe("sortByDate", () => {
  test("initially sorted", () => {
    expect(
      sortByDate([
        { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: "$101.2887" },
        { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: "$101.2731" },
        { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: "$101.2539" }
      ])
    ).toEqual([
      { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: "$101.2539" },
      { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: "$101.2731" },
      { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: "$101.2887" }
    ]);
  });
  test("initially unsorted", () => {
    expect(
      sortByDate([
        { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: "$101.2731" },
        { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: "$101.2887" },
        { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: "$101.2539" }
      ])
    ).toEqual([
      { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: "$101.2539" },
      { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: "$101.2731" },
      { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: "$101.2887" }
    ]);
  });
});
