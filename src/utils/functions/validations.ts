import { isEmpty } from 'ramda'
import Predicate from './Predicate'

export const isPresent = (x: string): boolean => !isEmpty(x.trim())

export const isEmail = (email: string): boolean =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)

export const isPassword = (password: string): boolean => {
  const length = password.length
  return length <= 16 && length >= 6
}

const validations = {
  username: Predicate.of(isPresent),
  email: Predicate.of(isPresent).concat(Predicate.of(isEmail)),
  password: Predicate.of(isPresent).concat(Predicate.of(isPassword)),
}

export default validations
