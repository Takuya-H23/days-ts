import jwt from 'jsonwebtoken'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { compose, head, isNil, prop } from 'ramda'
import { userTypes as U } from '../../../utils/types'
import { AUTH } from '../../../utils/constants'

export const setAuthCookie = (cookies: any) => (token: string) => () =>
  cookies.set(AUTH.AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

export const genToken = (secret: any, id: string): string =>
  jwt.sign({ id }, secret)

const genError = (e: any) => new Error(String(Error))
//@ts-ignore
const getHeadFromRows = compose(head, prop('rows'))

const checkUserExists = (user: U.User): TE.TaskEither<Error, U.User> =>
  isNil(user) ? TE.left(new Error('User not found')) : TE.right(user)

export const extractUser = (getUser: any): TE.TaskEither<Error, U.User> =>
  pipe(
    TE.tryCatch(getUser, genError),
    TE.map(getHeadFromRows),
    TE.chain(checkUserExists)
  )
