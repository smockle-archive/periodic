import Periodic from '../lib/periodic'
import get from 'lodash/get'
import set from 'lodash/set'
import path from 'path'
import test from 'tape'
import util from 'util'
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
    { Date: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)), NAV: '$102.5333' },
    { Date: new Date(Date.UTC(1995, 11, 28, 0, 0, 0)), NAV: '$102.5213' },
    { Date: new Date(Date.UTC(1995, 11, 27, 0, 0, 0)), NAV: '$102.502' },
    { Date: new Date(Date.UTC(1995, 11, 26, 0, 0, 0)), NAV: '$102.4842' },
    { Date: new Date(Date.UTC(1995, 11, 22, 0, 0, 0)), NAV: '$102.423' },
    { Date: new Date(Date.UTC(1995, 11, 21, 0, 0, 0)), NAV: '$102.4018' },
    { Date: new Date(Date.UTC(1995, 11, 20, 0, 0, 0)), NAV: '$102.383' },
    { Date: new Date(Date.UTC(1995, 11, 19, 0, 0, 0)), NAV: '$102.369' },
    { Date: new Date(Date.UTC(1995, 11, 18, 0, 0, 0)), NAV: '$102.344' },
    { Date: new Date(Date.UTC(1995, 11, 15, 0, 0, 0)), NAV: '$102.3086' },
    { Date: new Date(Date.UTC(1995, 11, 14, 0, 0, 0)), NAV: '$102.2927' },
    { Date: new Date(Date.UTC(1995, 11, 13, 0, 0, 0)), NAV: '$102.2727' },
    { Date: new Date(Date.UTC(1995, 11, 12, 0, 0, 0)), NAV: '$102.2627' },
    { Date: new Date(Date.UTC(1995, 11, 11, 0, 0, 0)), NAV: '$102.2474' },
    { Date: new Date(Date.UTC(1995, 11, 8, 0, 0, 0)), NAV: '$102.2061' },
    { Date: new Date(Date.UTC(1995, 11, 7, 0, 0, 0)), NAV: '$102.1927' },
    { Date: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)), NAV: '$102.0835' },
    { Date: new Date(Date.UTC(1995, 9, 31, 0, 0, 0)), NAV: '$101.6569' },
    { Date: new Date(Date.UTC(1995, 9, 6, 0, 0, 0)), NAV: '$101.3199' },
    { Date: new Date(Date.UTC(1995, 9, 5, 0, 0, 0)), NAV: '$101.3143' },
    { Date: new Date(Date.UTC(1995, 9, 4, 0, 0, 0)), NAV: '$101.2887' },
    { Date: new Date(Date.UTC(1995, 9, 3, 0, 0, 0)), NAV: '$101.2731' },
    { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: '$101.2539' }
  ])
})

test('Periodic.toJSON', t => {
  t.plan(1)
  const periodic = new Periodic(workbookPath)

  t.deepEqual(
    periodic.toJSON(),
    '[{"Date":"1995-12-29T00:00:00.000Z","NAV":"$102.5333"},{"Date":"1995-12-28T00:00:00.000Z","NAV":"$102.5213"},{"Date":"1995-12-27T00:00:00.000Z","NAV":"$102.502"},{"Date":"1995-12-26T00:00:00.000Z","NAV":"$102.4842"},{"Date":"1995-12-22T00:00:00.000Z","NAV":"$102.423"},{"Date":"1995-12-21T00:00:00.000Z","NAV":"$102.4018"},{"Date":"1995-12-20T00:00:00.000Z","NAV":"$102.383"},{"Date":"1995-12-19T00:00:00.000Z","NAV":"$102.369"},{"Date":"1995-12-18T00:00:00.000Z","NAV":"$102.344"},{"Date":"1995-12-15T00:00:00.000Z","NAV":"$102.3086"},{"Date":"1995-12-14T00:00:00.000Z","NAV":"$102.2927"},{"Date":"1995-12-13T00:00:00.000Z","NAV":"$102.2727"},{"Date":"1995-12-12T00:00:00.000Z","NAV":"$102.2627"},{"Date":"1995-12-11T00:00:00.000Z","NAV":"$102.2474"},{"Date":"1995-12-08T00:00:00.000Z","NAV":"$102.2061"},{"Date":"1995-12-07T00:00:00.000Z","NAV":"$102.1927"},{"Date":"1995-11-30T00:00:00.000Z","NAV":"$102.0835"},{"Date":"1995-10-31T00:00:00.000Z","NAV":"$101.6569"},{"Date":"1995-10-06T00:00:00.000Z","NAV":"$101.3199"},{"Date":"1995-10-05T00:00:00.000Z","NAV":"$101.3143"},{"Date":"1995-10-04T00:00:00.000Z","NAV":"$101.2887"},{"Date":"1995-10-03T00:00:00.000Z","NAV":"$101.2731"},{"Date":"1995-10-02T00:00:00.000Z","NAV":"$101.2539"}]'
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
        { Date: new Date(Date.UTC(1995, 9, 2, 0, 0, 0)), NAV: '$101.2539' }
      ])
    ),
    "Periodic([\n  { Date: 1995-10-02T00:00:00.000Z, NAV: '$101.2539' }\n])",
    'array with one element'
  )

  t.equal(
    util.inspect(periodic),
    "Periodic([\n  { Date: 1995-12-29T00:00:00.000Z, NAV: '$102.5333' },\n  { Date: 1995-12-28T00:00:00.000Z, NAV: '$102.5213' },\n  { Date: 1995-12-27T00:00:00.000Z, NAV: '$102.502' },\n  { Date: 1995-12-26T00:00:00.000Z, NAV: '$102.4842' },\n  { Date: 1995-12-22T00:00:00.000Z, NAV: '$102.423' },\n  { Date: 1995-12-21T00:00:00.000Z, NAV: '$102.4018' },\n  { Date: 1995-12-20T00:00:00.000Z, NAV: '$102.383' },\n  { Date: 1995-12-19T00:00:00.000Z, NAV: '$102.369' },\n  { Date: 1995-12-18T00:00:00.000Z, NAV: '$102.344' },\n  { Date: 1995-12-15T00:00:00.000Z, NAV: '$102.3086' },\n  { Date: 1995-12-14T00:00:00.000Z, NAV: '$102.2927' },\n  { Date: 1995-12-13T00:00:00.000Z, NAV: '$102.2727' },\n  { Date: 1995-12-12T00:00:00.000Z, NAV: '$102.2627' },\n  { Date: 1995-12-11T00:00:00.000Z, NAV: '$102.2474' },\n  { Date: 1995-12-08T00:00:00.000Z, NAV: '$102.2061' },\n  { Date: 1995-12-07T00:00:00.000Z, NAV: '$102.1927' },\n  { Date: 1995-11-30T00:00:00.000Z, NAV: '$102.0835' },\n  { Date: 1995-10-31T00:00:00.000Z, NAV: '$101.6569' },\n  { Date: 1995-10-06T00:00:00.000Z, NAV: '$101.3199' },\n  { Date: 1995-10-05T00:00:00.000Z, NAV: '$101.3143' },\n  { Date: 1995-10-04T00:00:00.000Z, NAV: '$101.2887' },\n  { Date: 1995-10-03T00:00:00.000Z, NAV: '$101.2731' },\n  { Date: 1995-10-02T00:00:00.000Z, NAV: '$101.2539' }\n])",
    'array with many elements'
  )
})

test('Periodic.getMonthlyNAV', t => {
  t.plan(1)
  const periodic = new Periodic(workbookPath)

  t.deepEqual(
    periodic.getMonthlyNAV(),
    [
      { Date: new Date(Date.UTC(1995, 9, 31, 0, 0, 0)), NAV: '$101.6569' },
      { Date: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)), NAV: '$102.0835' },
      { Date: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)), NAV: '$102.5333' }
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
      {
        Date: new Date(Date.UTC(1995, 10, 30, 0, 0, 0)),
        Return: 0.41964687099449977
      },
      {
        Date: new Date(Date.UTC(1995, 11, 29, 0, 0, 0)),
        Return: 0.44061968878417784
      }
    ],
    'getMonthlyReturn'
  )
})
