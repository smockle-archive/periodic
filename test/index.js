const {
  Periodic,
  sortByDate,
  getRangeInMonths,
  getReturn,
  parseCurrency,
  datedRowsToWorksheet
} = require('../lib/index.js')
const { get, set, round } = require('lodash')
const path = require('path')
const test = require('tape')
const util = require('util')
const workbookPath = path.resolve('./data/test.xlsx')

test('Periodic.constructor', t => {
  t.plan(2)
  const periodic = new Periodic(workbookPath)

  t.equal(
    get(periodic._workbook, 'SheetNames.0'),
    'Daily Performance',
    '_workbook'
  )

  t.equal(get(periodic._worksheet, '!ref'), 'A1:B24', '_worksheet')
})

test('Periodic.valueOf', t => {
  t.plan(1)
  const periodic = new Periodic(workbookPath)

  t.deepEqual(periodic.valueOf(), [
    { Date: new Date('12/29/1995'), NAV: '$102.5333' },
    { Date: new Date('12/28/1995'), NAV: '$102.5213' },
    { Date: new Date('12/27/1995'), NAV: '$102.502' },
    { Date: new Date('12/26/1995'), NAV: '$102.4842' },
    { Date: new Date('12/22/1995'), NAV: '$102.423' },
    { Date: new Date('12/21/1995'), NAV: '$102.4018' },
    { Date: new Date('12/20/1995'), NAV: '$102.383' },
    { Date: new Date('12/19/1995'), NAV: '$102.369' },
    { Date: new Date('12/18/1995'), NAV: '$102.344' },
    { Date: new Date('12/15/1995'), NAV: '$102.3086' },
    { Date: new Date('12/14/1995'), NAV: '$102.2927' },
    { Date: new Date('12/13/1995'), NAV: '$102.2727' },
    { Date: new Date('12/12/1995'), NAV: '$102.2627' },
    { Date: new Date('12/11/1995'), NAV: '$102.2474' },
    { Date: new Date('12/08/1995'), NAV: '$102.2061' },
    { Date: new Date('12/07/1995'), NAV: '$102.1927' },
    { Date: new Date('11/30/1995'), NAV: '$102.0835' },
    { Date: new Date('10/31/1995'), NAV: '$101.6569' },
    { Date: new Date('10/06/1995'), NAV: '$101.3199' },
    { Date: new Date('10/05/1995'), NAV: '$101.3143' },
    { Date: new Date('10/04/1995'), NAV: '$101.2887' },
    { Date: new Date('10/03/1995'), NAV: '$101.2731' },
    { Date: new Date('10/02/1995'), NAV: '$101.2539' }
  ])
})

test('Periodic.toJSON', t => {
  t.plan(1)
  const periodic = new Periodic(workbookPath)

  t.deepEqual(
    periodic.toJSON(),
    '[{"Date":"1995-12-29T08:00:00.000Z","NAV":"$102.5333"},{"Date":"1995-12-28T08:00:00.000Z","NAV":"$102.5213"},{"Date":"1995-12-27T08:00:00.000Z","NAV":"$102.502"},{"Date":"1995-12-26T08:00:00.000Z","NAV":"$102.4842"},{"Date":"1995-12-22T08:00:00.000Z","NAV":"$102.423"},{"Date":"1995-12-21T08:00:00.000Z","NAV":"$102.4018"},{"Date":"1995-12-20T08:00:00.000Z","NAV":"$102.383"},{"Date":"1995-12-19T08:00:00.000Z","NAV":"$102.369"},{"Date":"1995-12-18T08:00:00.000Z","NAV":"$102.344"},{"Date":"1995-12-15T08:00:00.000Z","NAV":"$102.3086"},{"Date":"1995-12-14T08:00:00.000Z","NAV":"$102.2927"},{"Date":"1995-12-13T08:00:00.000Z","NAV":"$102.2727"},{"Date":"1995-12-12T08:00:00.000Z","NAV":"$102.2627"},{"Date":"1995-12-11T08:00:00.000Z","NAV":"$102.2474"},{"Date":"1995-12-08T08:00:00.000Z","NAV":"$102.2061"},{"Date":"1995-12-07T08:00:00.000Z","NAV":"$102.1927"},{"Date":"1995-11-30T08:00:00.000Z","NAV":"$102.0835"},{"Date":"1995-10-31T08:00:00.000Z","NAV":"$101.6569"},{"Date":"1995-10-06T07:00:00.000Z","NAV":"$101.3199"},{"Date":"1995-10-05T07:00:00.000Z","NAV":"$101.3143"},{"Date":"1995-10-04T07:00:00.000Z","NAV":"$101.2887"},{"Date":"1995-10-03T07:00:00.000Z","NAV":"$101.2731"},{"Date":"1995-10-02T07:00:00.000Z","NAV":"$101.2539"}]'
  )
})

test('Periodic.inspect', t => {
  t.plan(4)
  const periodic = new Periodic(workbookPath)

  t.equal(
    util.inspect(set(new Periodic(workbookPath), 'value', undefined)),
    'undefined',
    'undefined'
  )

  t.equal(
    util.inspect(set(new Periodic(workbookPath), 'value', [])),
    'Periodic([])',
    'empty array'
  )

  t.equal(
    util.inspect(
      set(new Periodic(workbookPath), 'value', [
        { Date: new Date('10/02/1995'), NAV: '$101.2539' }
      ])
    ),
    "Periodic([\n  { Date: 1995-10-02T07:00:00.000Z, NAV: '$101.2539' }\n])",
    'array with one element'
  )

  t.equal(
    util.inspect(periodic),
    "Periodic([\n  { Date: 1995-12-29T08:00:00.000Z, NAV: '$102.5333' },\n  { Date: 1995-12-28T08:00:00.000Z, NAV: '$102.5213' },\n  { Date: 1995-12-27T08:00:00.000Z, NAV: '$102.502' },\n  { Date: 1995-12-26T08:00:00.000Z, NAV: '$102.4842' },\n  { Date: 1995-12-22T08:00:00.000Z, NAV: '$102.423' },\n  { Date: 1995-12-21T08:00:00.000Z, NAV: '$102.4018' },\n  { Date: 1995-12-20T08:00:00.000Z, NAV: '$102.383' },\n  { Date: 1995-12-19T08:00:00.000Z, NAV: '$102.369' },\n  { Date: 1995-12-18T08:00:00.000Z, NAV: '$102.344' },\n  { Date: 1995-12-15T08:00:00.000Z, NAV: '$102.3086' },\n  { Date: 1995-12-14T08:00:00.000Z, NAV: '$102.2927' },\n  { Date: 1995-12-13T08:00:00.000Z, NAV: '$102.2727' },\n  { Date: 1995-12-12T08:00:00.000Z, NAV: '$102.2627' },\n  { Date: 1995-12-11T08:00:00.000Z, NAV: '$102.2474' },\n  { Date: 1995-12-08T08:00:00.000Z, NAV: '$102.2061' },\n  { Date: 1995-12-07T08:00:00.000Z, NAV: '$102.1927' },\n  { Date: 1995-11-30T08:00:00.000Z, NAV: '$102.0835' },\n  { Date: 1995-10-31T08:00:00.000Z, NAV: '$101.6569' },\n  { Date: 1995-10-06T07:00:00.000Z, NAV: '$101.3199' },\n  { Date: 1995-10-05T07:00:00.000Z, NAV: '$101.3143' },\n  { Date: 1995-10-04T07:00:00.000Z, NAV: '$101.2887' },\n  { Date: 1995-10-03T07:00:00.000Z, NAV: '$101.2731' },\n  { Date: 1995-10-02T07:00:00.000Z, NAV: '$101.2539' }\n])",
    'array with many elements'
  )
})

test('Periodic.getMonthlyNAV', t => {
  t.plan(1)
  const periodic = new Periodic(workbookPath)

  t.deepEqual(
    periodic.getMonthlyNAV(),
    [
      { Date: new Date('10/31/1995'), NAV: '$101.6569' },
      { Date: new Date('11/30/1995'), NAV: '$102.0835' },
      { Date: new Date('12/29/1995'), NAV: '$102.5333' }
    ],
    'getMonthlyNAV'
  )
})

test('Periodic.getMonthlyReturn', t => {
  t.plan(1)
  const periodic = new Periodic(workbookPath)

  t.deepEqual(
    periodic.getMonthlyReturn(),
    [
      { Date: new Date('11/30/1995'), Return: 0.41964687099449977 },
      { Date: new Date('12/29/1995'), Return: 0.44061968878417784 }
    ],
    'getMonthlyReturn'
  )
})

test('sortByDate', t => {
  t.deepEqual(
    sortByDate([
      { Date: new Date('10/04/1995'), NAV: '$101.2887' },
      { Date: new Date('10/03/1995'), NAV: '$101.2731' },
      { Date: new Date('10/02/1995'), NAV: '$101.2539' }
    ]),
    [
      { Date: new Date('10/02/1995'), NAV: '$101.2539' },
      { Date: new Date('10/03/1995'), NAV: '$101.2731' },
      { Date: new Date('10/04/1995'), NAV: '$101.2887' }
    ],
    'initially sorted'
  )

  t.deepEqual(
    sortByDate([
      { Date: new Date('10/03/1995'), NAV: '$101.2731' },
      { Date: new Date('10/04/1995'), NAV: '$101.2887' },
      { Date: new Date('10/02/1995'), NAV: '$101.2539' }
    ]),
    [
      { Date: new Date('10/02/1995'), NAV: '$101.2539' },
      { Date: new Date('10/03/1995'), NAV: '$101.2731' },
      { Date: new Date('10/04/1995'), NAV: '$101.2887' }
    ],
    'initially unsorted'
  )
  t.end()
})

test('getRangeInMonths', t => {
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2016, 12)),
    1,
    'one month, same year'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 11), new Date(2016, 12)),
    2,
    'two months, same year'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 1)),
    2,
    'two months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 2)),
    3,
    'three months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 11)),
    12,
    'twelve months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2017, 12)),
    13,
    'thirteen months'
  )
  t.equal(
    getRangeInMonths(new Date(2016, 12), new Date(2018, 1)),
    14,
    'fourteen months'
  )
  t.end()
})

test('getReturn', t => {
  t.equal(round(getReturn(101.6569, 102.0835), 4), 0.4196, 'positive return')
  t.equal(round(getReturn(102.0835, 101.6569), 4), -0.4179, 'negative return')
  t.equal(round(getReturn(100, 100), 4), 0, 'zero return')
  t.end()
})

test('parseCurrency', t => {
  t.equal(round(parseCurrency('$101.6569'), 4), 101.6569, 'with cents')
  t.equal(round(parseCurrency('$101'), 4), 101, 'without cents')
  t.equal(round(parseCurrency('$0.0000'), 4), 0, 'zero')
  t.end()
})

test('datedRowsToWorksheet', t => {
  t.deepEqual(
    datedRowsToWorksheet([
      { Date: new Date('11/30/1995'), Return: 0.41964687099449977 },
      { Date: new Date('12/29/1995'), Return: 0.44061968878417784 }
    ]),
    {
      A1: { t: 'd', v: new Date('11/30/1995') },
      B1: { t: 'n', v: 0.41964687099449977 },
      A2: { t: 'd', v: new Date('12/29/1995') },
      B2: { t: 'n', v: 0.44061968878417784 },
      '!ref': 'A1:B2'
    },
    'datedRowsToWorksheet'
  )
  t.end()
})
