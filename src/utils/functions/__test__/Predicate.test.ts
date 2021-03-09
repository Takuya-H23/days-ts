import { prop } from 'ramda'
import { Predicate } from 'fts-utils'
import { isPresent } from '../validateInput'

const isPresentPredicate = Predicate(isPresent)
const isNumberPredicate = Predicate(x => typeof x === 'number')

test('should "run"', () => {
  expect(isPresentPredicate.run('foobar')).toBeTruthy()
  expect(isPresentPredicate.run('')).toBeFalsy()
})

test('should "contramap"', () => {
  const isTestValid = isPresentPredicate.contramap(prop('test'))
  expect(isTestValid.run({ test: 'john doe' })).toBeTruthy()
  expect(isTestValid.run({ test: '  ' })).toBeFalsy()
})

test('should concat other Predicates', () => {
  const concatPredicate = isNumberPredicate
    .contramap(prop('type'))
    .concat(isPresentPredicate.contramap(prop('lang')))

  expect(concatPredicate.run({ lang: 'en', type: 2 })).toBeTruthy()
  expect(concatPredicate.run({ lang: 'en', type: '2' })).toBeFalsy()
})
