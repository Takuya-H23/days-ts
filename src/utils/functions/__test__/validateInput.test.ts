import validateInput, { isPresent, isEmail, isPassword } from '../validateInput'

test('should return false when string is a falsy', () => {
  expect(isPresent(' ')).toBeFalsy()
  expect(isPresent('')).toBeFalsy()
})

test.each([['foobar'], ['john doe'], ['  h']])(
  'should return false when string is a falsy',
  (s: string) => {
    expect(isPresent(s)).toBe(true)
  }
)

test.each([['hello'], ['test@here'], ['noGood@.com']])(
  'should return false when email is invalid',
  (email: string) => {
    expect(isEmail(email)).toBeFalsy()
  }
)

test.each([['hello@email.com'], ['test@t.here'], ['noGood@but.com']])(
  'should return false when email is invalid',
  (email: string) => {
    expect(isEmail(email)).toBe(true)
  }
)

test.each([['12345'], ['thisIsMoreThanSixteen']])(
  'should return false when password length is less than 6 or more than 16',
  password => {
    expect(isPassword(password)).toBeFalsy()
  }
)

test.each([['123456'], ['myValidPassword']])(
  'should return true when password length is valid',
  password => {
    expect(isPassword(password)).toBe(true)
  }
)

test('should return error object when invalid input values exist', () => {
  const invalidInput = {
    username: ' ',
    email: 'myEmail',
    password: 'validPassword',
  }

  expect(validateInput(invalidInput)).toEqual({
    username: 'Please enter a valid username',
    email: 'Please enter a valid email',
  })
})

test('should return an empty object when all the input values are valid', () => {
  const validInput = {
    username: 'john doe',
    email: 'john@lol.com',
    password: 'helloJohnDoe',
  }

  expect(validateInput(validInput)).toEqual({})
})
