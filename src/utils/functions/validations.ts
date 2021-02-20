import { isNil, isEmpty } from 'ramda'

export const isPresent = (x: string): boolean => !isEmpty(x.trim())

export const isEmail = (email: string): boolean =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)

export const isPassword = (password: string): boolean => {
  const length = password.length
  return length <= 16 && length >= 6
}
