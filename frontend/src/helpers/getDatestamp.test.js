import getDatestamp from './getDatestamp'

test('datestamp length should be appropriate', () => {
  expect(getDatestamp()).toHaveLength('2022-05-27'.length)
})

test('datestamp should have current year', () => {
  const currYear = (new Date()).getFullYear()
  const year = getDatestamp().split('-')[0]
  expect(year).toEqual(currYear.toString())
})

test('datestamp should have current month', () => {
  const currMonth = (new Date()).getMonth() + 1
  const month = getDatestamp().split('-')[1]
  expect(Number.parseInt(month)).toEqual(currMonth)
})

test('datestamp should have current day', () => {
  const currDay = (new Date()).getDate()
  const day = getDatestamp().split('-')[2]
  expect(Number.parseInt(day)).toEqual(currDay)
})
