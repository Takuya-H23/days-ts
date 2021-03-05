import jwt from 'jsonwebtoken'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe, flow } from 'fp-ts/function'
import { compose, head, isNil, prop } from 'ramda'
import { userTypes as U } from '../../../utils/types'
import { AUTH } from '../../../utils/constants'
import { getHeadFromRows, genServerError } from './general'

export const setAuthCookie = (cookies: any) => (token: string) =>
  cookies.set(AUTH.AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

export const genToken = (secret: any, id: string): string =>
  jwt.sign({ id }, secret)

export const getCookie = (cookies: any) => cookies.get(AUTH.AUTH_COOKIE)

export const getUser = flow(getCookie, E.fromNullable(null))

// User fetching ===========================================================
export const checkUserExists = (user: U.User): TE.TaskEither<Error, U.User> =>
  isNil(user)
    ? TE.left(new Error('User not found. Please check your credentials'))
    : TE.right(user)

export const extractUser = (queryUser: any): TE.TaskEither<Error, U.User> =>
  pipe(
    TE.tryCatch(queryUser, genServerError),
    TE.map(getHeadFromRows),
    TE.chain(checkUserExists)
  )
