import { Periodic } from "../src/lib/periodic.mjs";
import { get, set } from "lodash";
import { resolve } from "path";
import { inspect } from "util";
const workbookPath = resolve("./data/test.xlsx");

describe("Periodic", () => {
  describe("constructor", () => {
    const periodic = new Periodic(workbookPath);
    test("_workbook", () => {
      expect(get(periodic._workbook, "SheetNames.0")).toEqual(
        "Daily Performance"
      );
    });
    test("_worksheet", () => {
      expect(get(periodic._worksheet, "!ref")).toEqual("A1:B24");
    });
  });
  test("valueOf", () => {
    const periodic = new Periodic(workbookPath);
    expect(periodic.valueOf()).toEqual([
      { Date: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)), NAV: "$102.5333" },
      { Date: new Date(Date.UTC(1995, 11, 28, 0, 0, 0)), NAV: "$102.5213" },
      { Date: new Date(Date.UTC(1995, 11, 27, 0, 0, 0)), NAV: "$102.502" },
      { Date: new Date(Date.UTC(1995, 11, 26, 0, 0, 0)), NAV: "$102.4842" },
      { Date: new Date(Date.UTC(1995, 11, 22, 0, 0, 0)), NAV: "$102.423" },
      { Date: new Date(Date.UTC(1995, 11, 21, 0, 0, 0)), NAV: "$102.4018" },
      { Date: new Date(Date.UTC(1995, 11, 20, 0, 0, 0)), NAV: "$102.383" },
      { Date: new Date(Date.UTC(1995, 11, 19, 0, 0, 0)), NAV: "$102.369" },
      { Date: new Date(Date.UTC(1995, 11, 18, 0, 0, 0)), NAV: "$102.344" },
      { Date: new Date(Date.UTC(1995, 11, 15, 0, 0, 0)), NAV: "$102.3086" },
      { Date: new Date(Date.UTC(1995, 11, 14, 0, 0, 0)), NAV: "$102.2927" },
      { Date: new Date(Date.UTC(1995, 11, 13, 0, 0, 0)), NAV: "$102.2727" },
      { Date: new Date(Date.UTC(1995, 11, 12, 0, 0, 0)), NAV: "$102.2627" },
      { Date: new Date(Date.UTC(1995, 11, 11, 0, 0, 0)), NAV: "$102.2474" },
      { Date: new Date(Date.UTC(1995, 11, 8, 0, 0, 0)), NAV: "$102.2061" },
      { Date: new Date(Date.UTC(1995, 11, 7, 0, 0, 0)), NAV: "$102.1927" },
      { Date: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)), NAV: "$102.0835" },
      { Date: new Date(Date.UTC(1995, 9, 31, 0, 0, 0)), NAV: "$101.6569" },
      { Date: new Date(Date.UTC(1995, 9, 6, 0, 0, 0)), NAV: "$101.3199" },
      { Date: new Date(Date.UTC(1995, 9, 5, 0, 0, 0)), NAV: "$101.3143" },
      { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: "$101.2887" },
      { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: "$101.2731" },
      { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: "$101.2539" }
    ]);
  });
  test("toJSON", () => {
    const periodic = new Periodic(workbookPath);
    expect(periodic.toJSON()).toEqual(
      '[{"Date":"1995-12-29T00:00:00.000Z","NAV":"$102.5333"},{"Date":"1995-12-28T00:00:00.000Z","NAV":"$102.5213"},{"Date":"1995-12-27T00:00:00.000Z","NAV":"$102.502"},{"Date":"1995-12-26T00:00:00.000Z","NAV":"$102.4842"},{"Date":"1995-12-22T00:00:00.000Z","NAV":"$102.423"},{"Date":"1995-12-21T00:00:00.000Z","NAV":"$102.4018"},{"Date":"1995-12-20T00:00:00.000Z","NAV":"$102.383"},{"Date":"1995-12-19T00:00:00.000Z","NAV":"$102.369"},{"Date":"1995-12-18T00:00:00.000Z","NAV":"$102.344"},{"Date":"1995-12-15T00:00:00.000Z","NAV":"$102.3086"},{"Date":"1995-12-14T00:00:00.000Z","NAV":"$102.2927"},{"Date":"1995-12-13T00:00:00.000Z","NAV":"$102.2727"},{"Date":"1995-12-12T00:00:00.000Z","NAV":"$102.2627"},{"Date":"1995-12-11T00:00:00.000Z","NAV":"$102.2474"},{"Date":"1995-12-08T00:00:00.000Z","NAV":"$102.2061"},{"Date":"1995-12-07T00:00:00.000Z","NAV":"$102.1927"},{"Date":"1995-11-30T00:00:00.000Z","NAV":"$102.0835"},{"Date":"1995-10-31T00:00:00.000Z","NAV":"$101.6569"},{"Date":"1995-10-06T00:00:00.000Z","NAV":"$101.3199"},{"Date":"1995-10-05T00:00:00.000Z","NAV":"$101.3143"},{"Date":"1995-10-04T00:00:00.000Z","NAV":"$101.2887"},{"Date":"1995-10-03T00:00:00.000Z","NAV":"$101.2731"},{"Date":"1995-10-02T00:00:00.000Z","NAV":"$101.2539"}]'
    );
  });
  describe("inspect", () => {
    const periodic = new Periodic(workbookPath);
    test("undefined", () => {
      expect(
        inspect(set(new Periodic(workbookPath), "value", undefined))
      ).toEqual("undefined");
    });
    test("empty array", () => {
      expect(inspect(set(new Periodic(workbookPath), "value", []))).toEqual(
        "Periodic([])"
      );
    });
    test("array with one element", () => {
      expect(
        inspect(
          set(new Periodic(workbookPath), "value", [
            { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: "$101.2539" }
          ])
        )
      ).toEqual(
        "Periodic([\n  { Date: 1995-10-02T00:00:00.000Z, NAV: '$101.2539' }\n])"
      );
    });
    test("array with many elements", () => {
      expect(inspect(periodic)).toEqual(
        "Periodic([\n  { Date: 1995-12-29T00:00:00.000Z, NAV: '$102.5333' },\n  { Date: 1995-12-28T00:00:00.000Z, NAV: '$102.5213' },\n  { Date: 1995-12-27T00:00:00.000Z, NAV: '$102.502' },\n  { Date: 1995-12-26T00:00:00.000Z, NAV: '$102.4842' },\n  { Date: 1995-12-22T00:00:00.000Z, NAV: '$102.423' },\n  { Date: 1995-12-21T00:00:00.000Z, NAV: '$102.4018' },\n  { Date: 1995-12-20T00:00:00.000Z, NAV: '$102.383' },\n  { Date: 1995-12-19T00:00:00.000Z, NAV: '$102.369' },\n  { Date: 1995-12-18T00:00:00.000Z, NAV: '$102.344' },\n  { Date: 1995-12-15T00:00:00.000Z, NAV: '$102.3086' },\n  { Date: 1995-12-14T00:00:00.000Z, NAV: '$102.2927' },\n  { Date: 1995-12-13T00:00:00.000Z, NAV: '$102.2727' },\n  { Date: 1995-12-12T00:00:00.000Z, NAV: '$102.2627' },\n  { Date: 1995-12-11T00:00:00.000Z, NAV: '$102.2474' },\n  { Date: 1995-12-08T00:00:00.000Z, NAV: '$102.2061' },\n  { Date: 1995-12-07T00:00:00.000Z, NAV: '$102.1927' },\n  { Date: 1995-11-30T00:00:00.000Z, NAV: '$102.0835' },\n  { Date: 1995-10-31T00:00:00.000Z, NAV: '$101.6569' },\n  { Date: 1995-10-06T00:00:00.000Z, NAV: '$101.3199' },\n  { Date: 1995-10-05T00:00:00.000Z, NAV: '$101.3143' },\n  { Date: 1995-10-04T00:00:00.000Z, NAV: '$101.2887' },\n  { Date: 1995-10-03T00:00:00.000Z, NAV: '$101.2731' },\n  { Date: 1995-10-02T00:00:00.000Z, NAV: '$101.2539' }\n])"
      );
    });
  });
  describe("getMonthlyNAV", () => {
    const periodic = new Periodic(workbookPath);
    test("getMonthlyNAV", () => {
      expect(periodic.getMonthlyNAV()).toEqual([
        { Date: new Date(Date.UTC(1995, 9, 31, 0, 0, 0)), NAV: "$101.6569" },
        { Date: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)), NAV: "$102.0835" },
        { Date: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)), NAV: "$102.5333" }
      ]);
    });
  });
  describe("getMonthlyReturn", () => {
    const periodic = new Periodic(workbookPath);
    test("getMonthlyReturn", () => {
      expect(periodic.getMonthlyReturn()).toEqual([
        {
          Date: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)),
          Return: 0.41964687099449977
        },
        {
          Date: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)),
          Return: 0.44061968878417784
        }
      ]);
    });
  });
});
