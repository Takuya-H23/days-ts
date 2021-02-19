import jwt from 'jsonwebtoken'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe}  from 'fp-ts/function'
import { compose, head, isNil, prop } from 'ramda'


export const setAuthCookie = (cookies:any) => (token: string) => () => cookies.set('auth-cookie', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7
  })

export const genToken = (secret: any, id: string, ): string => jwt.sign({ id }, secret)

const genError = (e: Error): Error => new Error(String(Error))

interface User {
  user_id: string,
  username: string,
  created_at: string,
  last_login?: string
}

export const extractUser = (getUser: any): TE.TaskEither<Error, User> => pipe(
  TE.tryCatch(getUser, genError),
  TE.map(compose(head, prop('rows'))),
  TE.chain(user => isNil(user) ? TE.left(new Error('User not found')) :TE.right(user)),
)

