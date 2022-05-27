import capitalizeCity from './capitalizeCity'

test('capitalizeCity should not modify capitalized words', () => {
  const word = 'Abcdefg'
  expect(capitalizeCity(word)).toEqual(word)
})

test('capitalizeCity should capitalize words', () => {
  const word = 'abcdefg'
  const capitalized = 'Abcdefg'
  expect(capitalizeCity(word)).not.toEqual(word)
  expect(capitalizeCity(word)).toEqual(capitalized)
})
