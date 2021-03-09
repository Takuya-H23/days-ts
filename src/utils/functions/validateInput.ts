import { isEmpty } from 'ramda'
import { Predicate } from 'fts-utils'

export const isPresent = (x: string): boolean => !isEmpty(x.trim())

export const isEmail = (email: string): boolean =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)

export const isPassword = (password: string): boolean => {
  const length = password.length
  return length <= 16 && length >= 6
}

const checkPresence = Predicate(isPresent)

const validations = {
  username: checkPresence,
  email: checkPresence.concat(Predicate(isEmail)),
  password: checkPresence.concat(Predicate(isPassword)),
  category: checkPresence,
}

const validateInput = (input: { [key: string]: string }) =>
  Object.entries(input).reduce(
    (acc, [key, value]) =>
      //@ts-ignore
      validations[key].run(value)
        ? acc
        : Object.assign({}, acc, { [key]: `Please enter a valid ${key}` }),
    {}
  )

export default validateInput
